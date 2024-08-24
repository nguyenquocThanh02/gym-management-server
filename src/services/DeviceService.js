const Device = require("../models/DeviceModal");

const addDevice = (newDevice) => {
  return new Promise(async (resolve, reject) => {
    const { name } = newDevice;
    try {
      const checkExistDevice = await Device.findOne({
        name: name,
      });

      if (checkExistDevice !== null) {
        reject({
          status: "400",
          message: "The device is already",
        });
      }

      const createdDevice = await Device.create(newDevice);
      if (createdDevice) {
        resolve({
          status: "201",
          message: "SUCCESS",
          data: createdDevice,
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
      const device = await Device.findOne({
        _id: id,
      });
      if (device === null) {
        reject({
          status: "400",
          message: "The device is not defined",
        });
      }
      resolve({
        status: "200",
        message: "SUCCESS",
        data: device,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllDevice = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const devices = await Device.find();

      resolve({
        status: "200",
        message: "SUCCESS",
        data: devices,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateDevice = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkExistDevice = await Device.findOne({
        _id: id,
      });
      if (checkExistDevice === null) {
        reject({
          status: "400",
          message: "The device is not defined",
        });
      }

      const updatedDevice = await Device.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "200",
        message: "SUCCESS",
        data: updatedDevice,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const changeStatusDevice = (id, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkExistDevice = await Device.findOne({
        _id: id,
      });
      if (checkExistDevice === null) {
        reject({
          status: "400",
          message: "The device is not defined",
        });
      }

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
        reject({
          status: "400",
          message: "The device is not defined",
        });
      }

      await Device.findByIdAndDelete(id);
      resolve({
        status: "200",
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
