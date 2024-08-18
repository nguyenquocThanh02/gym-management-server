const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const register = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, password, accountName } = newUser;
    try {
      const checkUserEmail = await User.findOne({
        email: email,
      });
      const checkUserAccountName = await User.findOne({
        accountName: accountName,
      });
      if (checkUserEmail !== null) {
        reject({
          status: "400",
          message: "The email is already",
        });
      }

      if (checkUserAccountName !== null) {
        reject({
          status: "400",
          message: "The account name is already",
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        ...newUser,
        password: hash,
      });
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

const login = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { accountName, email, password } = userLogin;

    try {
      let checkUser;
      if (accountName) {
        checkUser = await User.findOne({
          accountName: accountName,
        });
      } else {
        checkUser = await User.findOne({
          email: email,
        });
      }
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

const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });
      if (user === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCESS",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.find();
      if (user === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCESS",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
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

      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "OK",
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
  updateUser,
  deleteUser,
  getDetailsUser,
  getAllUser,
};
