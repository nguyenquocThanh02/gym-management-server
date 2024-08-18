const Device = require("../models/DeviceModal");

const addDevice = (newPT) => {
  return new Promise(async (resolve, reject) => {
    const { contactInfo } = newPT;
    try {
      const checkExistPhone = await Device.findOne({
        contactInfo: { phone: contactInfo?.phone },
      });

      if (checkExistPhone !== null) {
        reject({
          status: "400",
          message: "The phone is already",
        });
      }

      const createdPT = await Device.create(newPT);
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

const getDetailsDevice = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pt = await Device.findOne({
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
const getAllDevice = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const pts = await Device.find();

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

const updateDevice = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkExistPT = await Device.findOne({
        _id: id,
      });
      if (checkExistPT === null) {
        reject({
          status: "400",
          message: "The pt is not defined",
        });
      }

      const updatedPT = await Device.findByIdAndUpdate(id, data, {
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

const changeStatusDevice = (id, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(">>>>", status);

      const checkExistPT = await Device.findOne({
        _id: id,
      });
      if (checkExistPT === null) {
        reject({
          status: "400",
          message: "The pt is not defined",
        });
      }

      console.log(">>>>", status);
      await Device.findByIdAndUpdate(id, { status: status }, { new: true });
      resolve({
        status: "200",
        message: "Change status success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteDevice = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkDevice = await Device.findOne({
        _id: id,
      });
      if (checkDevice === null) {
        resolve({
          status: "ERR",
          message: "The device is not defined",
        });
      }

      await Device.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete device success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  addDevice,
  updateDevice,
  changeStatusDevice,
  getDetailsDevice,
  getAllDevice,
  deleteDevice,
};
