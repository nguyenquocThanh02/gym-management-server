const PersonalTrainer = require("../models/PersonalTrainerModal");

const addPT = (newPT) => {
  return new Promise(async (resolve, reject) => {
    const { contactInfo } = newPT;
    try {
      const checkExistPhone = await PersonalTrainer.findOne({
        contactInfo: { phone: contactInfo?.phone },
      });

      if (checkExistPhone !== null) {
        reject({
          status: "400",
          message: "The phone is already",
        });
      }

      const createdPT = await PersonalTrainer.create(newPT);
      if (createdPT) {
        resolve({
          status: "201",
          message: "SUCCESS",
          data: createdPT,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsPT = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pt = await PersonalTrainer.findOne({
        _id: id,
      });
      if (pt === null) {
        reject({
          status: "400",
          message: "The pt is not defined",
        });
      }
      resolve({
        status: "200",
        message: "SUCCESS",
        data: pt,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllPT = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const pts = await PersonalTrainer.find();

      resolve({
        status: "200",
        message: "SUCCESS",
        data: pts,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updatePT = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkExistPT = await PersonalTrainer.findOne({
        _id: id,
      });
      if (checkExistPT === null) {
        reject({
          status: "400",
          message: "The pt is not defined",
        });
      }

      const updatedPT = await PersonalTrainer.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "200",
        message: "SUCCESS",
        data: updatedPT,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const changeStatusPT = (id, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(">>>>", status);

      const checkExistPT = await PersonalTrainer.findOne({
        _id: id,
      });
      if (checkExistPT === null) {
        reject({
          status: "400",
          message: "The pt is not defined",
        });
      }

      console.log(">>>>", status);
      await PersonalTrainer.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
      );
      resolve({
        status: "200",
        message: "Change status success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  addPT,
  updatePT,
  changeStatusPT,
  getDetailsPT,
  getAllPT,
};
