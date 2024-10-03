const Artical = require("../models/ArticalModal");
const User = require("../models/UserModel");

const addNewArtical = (newArtical) => {
  return new Promise(async (resolve, reject) => {
    const { userId, title, coverImage, content, description } = newArtical;
    try {
      const checkExistUser = await User.findOne({
        _id: userId,
      });
      if (!checkExistUser) {
        throw {
          status: 400,
          message: "The user is not defined",
        };
      }

      const dataCreate = {
        title: title,
        coverImage: coverImage,
        content: content,
        description: description || "",
        author: {
          name: checkExistUser?.accountName,
          id: userId,
        },
      };

      const createArtical = await Artical.create(dataCreate);
      if (createArtical) {
        resolve({
          status: 201,
          message: "Success",
          data: createArtical,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllArticals = (statusGet) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = statusGet ? { status: statusGet } : {};
      const articals = await Artical.find(query).select({
        _id: 1,
        title: 1,
        coverImage: 1,
        description: 1,
        author: {
          name: 1,
        },
        updatedAt: 1,
        createdAt: 1,
      });

      resolve({
        status: 200,
        message: "Success",
        data: articals,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getNewArticals = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const articals = await Artical.find({ status: "published" })
        .select({
          _id: 1,
          title: 1,
          coverImage: 1,
          description: 1,
          author: {
            name: 1,
          },
          updatedAt: 1,
          createdAt: 1,
        })
        .sort({ updatedAt: -1 })
        .limit(3);

      resolve({
        status: 200,
        message: "Success",
        data: articals,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getDetailsArtical = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkExistArtical = await Artical.findOne({
        _id: id,
      });
      if (!checkExistArtical) {
        throw {
          status: 400,
          message: "The artical is not defined",
        };
      }

      resolve({
        status: 200,
        message: "Success",
        data: checkExistArtical,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const changeStatusArtical = (id, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkExistArtical = await Artical.findOne({
        _id: id,
      });
      if (!checkExistArtical) {
        throw {
          status: 400,
          message: "The artical is not defined",
        };
      }
      const resultChange = await Artical.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
      );

      resolve({
        status: 200,
        message: "Success",
        data: resultChange,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const deleteArtical = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkExistArtical = await Artical.deleteOne({
        _id: id,
      });
      if (!checkExistArtical) {
        throw {
          status: 400,
          message: "The artical is not defined",
        };
      }

      resolve({
        status: 200,
        message: "Success",
        data: checkExistArtical,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  addNewArtical,
  getAllArticals,
  getDetailsArtical,
  getNewArticals,
  deleteArtical,
  changeStatusArtical,
};
