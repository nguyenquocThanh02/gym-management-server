const User = require("../models/UserModel");
const EmailService = require("../services/EmailService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  genneralAccessToken,
  genneralRefreshToken,
  genneralTokenInvite,
  genneralTokenResetPasword,
} = require("./JwtService");

const register = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, password, accountName, inviteToken } = newUser;
    try {
      const checkUserEmail = await User.findOne({
        email: email,
      });
      const checkUserAccountName = await User.findOne({
        accountName: accountName,
      });
      if (checkUserEmail !== null) {
        throw {
          status: "400",
          message: "The email is already exist",
        };
      }

      if (checkUserAccountName !== null) {
        throw {
          status: "400",
          message: "The account name is already exist",
        };
      }
      const hash = bcrypt.hashSync(password, 10);

      let createdUser = null;
      if (newUser?.inviteToken) {
        jwt.verify(
          inviteToken,
          process.env.INVITE_TOKEN,
          function (err, infor) {
            if (err) {
              throw {
                status: "401",
                message: "Authentication",
              };
            }

            if (infor?.email !== newUser?.email) {
              throw {
                status: "400",
                message: "The email incorrect",
              };
            }
          }
        );

        createdUser = await User.create({
          ...newUser,
          avatar:
            "https://firebasestorage.googleapis.com/v0/b/videocallapp-4fbc2.appspot.com/o/images%2FavataDefault.png?alt=media&token=731344aa-210d-45b0-84d3-9b27605cb25f",
          password: hash,
          role: "trainee",
          inviteToken: undefined,
        });
      } else {
        createdUser = await User.create({
          ...newUser,
          avatar:
            "https://firebasestorage.googleapis.com/v0/b/videocallapp-4fbc2.appspot.com/o/images%2FavataDefault.png?alt=media&token=731344aa-210d-45b0-84d3-9b27605cb25f",
          password: hash,
        });
      }
      if (createdUser) {
        resolve({
          status: "201",
          message: "SUCCESS",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const createPassword = (data) => {
  return new Promise(async (resolve, reject) => {
    const { password, resetToken } = data;
    try {
      jwt.verify(
        resetToken,
        process.env.RESET_TOKEN,
        async function (err, infor) {
          if (err) {
            reject({
              status: 401,
              message: "Authentication",
            });
          }

          if (infor?.email) {
            const theUser = await User.findOne({
              email: infor?.email,
            });

            if (!theUser) {
              return reject({
                status: "400",
                message: "The email does not exist",
              });
            }

            const hash = bcrypt.hashSync(password, 10);

            await User.findOneAndUpdate(
              { email: infor?.email },
              { password: hash },
              { new: true }
            );

            resolve({
              status: 200,
              message: "SUCCESS",
              data: { role: theUser?.role },
            });
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const login = (userLogin, role) => {
  return new Promise(async (resolve, reject) => {
    const { account, password } = userLogin;

    try {
      const checkUserByName = await User.findOne({
        accountName: account,
      });

      const checkUserByEmail = await User.findOne({
        email: account,
      });

      const checkUser = checkUserByEmail || checkUserByName;

      if (checkUser === null) {
        reject({
          status: "400",
          message: "The user is not defined",
        });
      }

      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (password !== checkUser.password && !comparePassword) {
        reject({
          status: "400",
          message: "The password or user is incorrect",
        });
      }

      if (role === "admin") {
        if (checkUser.role !== "admin")
          reject({
            status: "405",
            message: "You don't have admin permit",
          });
      }

      if (role === "trainee") {
        if (checkUser.role !== "admin" && checkUser.role !== "trainee")
          reject({
            status: "405",
            message: "You don't have trainee permit",
          });
      }
      const access_token = await genneralAccessToken({
        id: checkUser.id,
        role: checkUser.role,
      });

      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        role: checkUser.role,
      });

      resolve({
        status: "200",
        id: checkUser.id,
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const changeStatus = (id, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkExistUser = await User.findOne({
        _id: id,
      });
      if (checkExistUser === null) {
        reject({
          status: "400",
          message: "The User is not defined",
        });
      }

      await User.findByIdAndUpdate(id, { status: status }, { new: true });
      resolve({
        status: "200",
        message: "Change status success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const inviteAccount = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUserEmail = await User.findOne({
        email: email,
      });

      if (checkUserEmail !== null) {
        if (checkUserEmail?.role === "user") {
          await User.findByIdAndUpdate(
            checkUserEmail?.id,
            { role: "trainee" },
            { new: true }
          );
          resolve({
            status: "200",
            message: "Change status success",
          });
        }
        reject({
          status: "400",
          message: "The email is already permission manage",
        });
      } else {
        const invite_token = await genneralTokenInvite({
          email: email,
        });
        const response = await EmailService.EmailRegister(email, invite_token);

        resolve({
          status: "200",
          message: "SUCCESS",
          data: response,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const reset = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUserEmail = await User.findOne({
        email: email,
      });

      if (checkUserEmail === null) {
        throw {
          status: 403,
          message: "The email is not exist",
        };
      }

      const reset_token = await genneralTokenResetPasword({
        email: email,
      });
      const response = await EmailService.EmailReset(email, reset_token);

      resolve({
        status: "200",
        message: "SUCCESS",
        data: response,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const changeRole = (id, role) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkExistAccount = await User.findOne({
        _id: id,
      });
      if (checkExistAccount === null) {
        reject({
          status: "400",
          message: "The account is not defined",
        });
      }

      await User.findByIdAndUpdate(id, { role: role }, { new: true });
      resolve({
        status: "200",
        message: "Change status success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const changePassword = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        throw {
          status: 400,
          message: "The account is not defined",
        };
      }
      const comparePassword = bcrypt.compareSync(
        data?.password,
        checkUser.password
      );
      if (!comparePassword) {
        throw {
          status: 400,
          message: "The password is incorrect",
        };
      }

      const hash = bcrypt.hashSync(data?.newPassword, 10);

      await User.findByIdAndUpdate(id, { password: hash }, { new: true });
      resolve({
        status: 200,
        message: "Change password success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });
      if (user === null) {
        resolve({
          status: "403",
          message: "The user is not defined",
        });
      }
      resolve({
        status: "200",
        message: "SUCESS",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllRoleUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await User.find({ role: "user" });
      if (users === null) {
        reject({
          status: "400",
          message: "The users is not defined",
        });
      }
      resolve({
        status: "200",
        message: "SUCESS",
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllRoleTrainee = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const trainees = await User.find({ role: "trainee" });
      if (trainees === null) {
        reject({
          status: "400",
          message: "The trainees is not defined",
        });
      }
      resolve({
        status: "200",
        message: "SUCESS",
        data: trainees,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    const { accountName, email } = data;

    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        throw {
          status: "403",
          message: "The user is not defined",
        };
      }

      if (accountName !== checkUser?.accountName) {
        const checkUserAccountName = await User.findOne({
          accountName: accountName,
        });
        if (checkUserAccountName !== null) {
          throw {
            status: "400",
            message: "The account name is already exist",
          };
        }
      }

      if (email !== checkUser?.email) {
        const checkUserEmail = await User.findOne({
          email: email,
        });
        if (checkUserEmail !== null) {
          throw {
            status: "400",
            message: "The email is already exist",
          };
        }
      }

      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "200",
        message: "SUCCESS",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }

      await User.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete user success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  register,
  login,
  inviteAccount,
  reset,
  createPassword,
  updateUser,
  deleteUser,
  getDetailsUser,
  getAllRoleUser,
  getAllRoleTrainee,
  changeStatus,
  changeRole,
  changePassword,
};
