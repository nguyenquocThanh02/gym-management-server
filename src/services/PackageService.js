const Package = require("../models/PackageModal");

const addPackage = (newPackage) => {
  return new Promise(async (resolve, reject) => {
    const { name } = newPackage;

    try {
      const checkExistPackage = await Package.findOne({
        name: name,
      });

      if (checkExistPackage !== null) {
        throw {
          status: "400",
          message: "The package name is already exist",
        };
      }

      const createdPackage = await Package.create(newPackage);
      if (createdPackage) {
        resolve({
          status: "201",
          message: "SUCCESS",
          data: createdPackage,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsPackage = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const thePackage = await Package.findOne({
        _id: id,
      });
      if (thePackage === null) {
        throw {
          status: "400",
          message: "The Package is not defined",
        };
      }

      resolve({
        status: "200",
        message: "SUCCESS",
        data: thePackage,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllPackage = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const Packages = await Package.find();

      resolve({
        status: "200",
        message: "SUCCESS",
        data: Packages,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getPopularPackage = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const Packages = await Package.find();
      const sortedPackages = Packages.sort((a, b) => a.register - b.register);

      const topPopularPackages = sortedPackages.slice(0, 3);

      resolve({
        status: "200",
        message: "SUCCESS",
        data: topPopularPackages,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const updatePackage = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkExistPackage = await Package.findOne({
        _id: id,
      });
      if (checkExistPackage === null) {
        throw {
          status: "400",
          message: "The Package is not defined",
        };
      }
      const checkNamePackage = await Package.findOne({
        name: data?.name,
      });
      if (checkNamePackage && checkNamePackage?.id !== id) {
        throw {
          status: "400",
          message: "The Package Name is already exist",
        };
      }

      const updatedPackage = await Package.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "200",
        message: "SUCCESS",
        data: updatedPackage,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const changeStatusPackage = (id, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkExistPackage = await Package.findOne({
        _id: id,
      });
      if (checkExistPackage === null) {
        throw {
          status: "400",
          message: "The Package is not defined",
        };
      }

      await Package.findByIdAndUpdate(id, { status: status }, { new: true });
      resolve({
        status: "200",
        message: "Change status success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deletePackage = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkPackage = await Package.findOne({
        _id: id,
      });
      if (checkPackage === null) {
        reject({
          status: "400",
          message: "The Package is not defined",
        });
      }

      await Package.findByIdAndDelete(id);
      resolve({
        status: "200",
        message: "Delete Package success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  addPackage,
  updatePackage,
  changeStatusPackage,
  getDetailsPackage,
  getAllPackage,
  getPopularPackage,
  deletePackage,
};
