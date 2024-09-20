const RegisterTracking = require("../models/RegisterTrackingModal");
const Package = require("../models/PackageModal");
const EmailService = require("../services/EmailService");

const addRegisterTracking = (newTracking) => {
  return new Promise(async (resolve, reject) => {
    const { package, user, totalPrice, timeStart, timeEnd, isPaid } =
      newTracking;
    try {
      const packageData = await Package.findOneAndUpdate(
        {
          _id: package?.idPackage,
          stock: { $gte: 1 },
        },
        {
          $inc: {
            stock: -1,
            register: +1,
          },
        },
        { new: true }
      );

      if (!packageData) {
        return reject({
          status: "403",
          message: "Package is unavailable.",
        });
      }

      try {
        const createdRegisterTracking = await RegisterTracking.create(
          newTracking
        );
        try {
          await EmailService.EmailConfirm(user?.email, {
            namePackage: package?.name,
            totalPrice: totalPrice,
            nameUser: user?.fullName,
            timeStart: timeStart,
            timeEnd: timeEnd,
            isPaid: isPaid,
          });
        } catch (err) {
          console.err(err);
        }

        resolve({
          status: "201",
          message: "SUCCESS",
          data: createdRegisterTracking,
        });
      } catch (err) {
        console.log("herrr");
        await Package.findByIdAndUpdate(package?.idPackage, {
          $inc: { stock: 1 },
        });
        return reject({
          status: "500",
          message: "Failed to create register tracking.",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateregisterTracking = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkregisterTracking = await registerTracking.findOne({
        _id: id,
      });
      if (checkregisterTracking === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }

      const updatedregisterTracking = await registerTracking.findByIdAndUpdate(
        id,
        { isDelivered: data },
        { new: true }
      );
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedregisterTracking,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllRegisterTrackingOfUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const registerTracking = await RegisterTracking.find({
        "user?.idUser": id,
      }).sort({ createdAt: -1, updatedAt: -1 });
      if (registerTracking === null) {
        throw {
          status: "403",
          message: "The register tracking is not defined",
        };
      }

      resolve({
        status: "200",
        message: "SUCESSS",
        data: registerTracking,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getregisterTrackingDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const registerTracking = await registerTracking.findById({
        _id: id,
      });
      if (registerTracking === null) {
        resolve({
          status: "ERR",
          message: "The registerTracking is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESSS",
        data: registerTracking,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const cancelregisterTrackingDetails = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let registerTracking = [];
      const promises = data.map(async (registerTracking) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: registerTracking.product,
            selled: { $gte: registerTracking.amount },
          },
          {
            $inc: {
              countInStock: +registerTracking.amount,
              selled: -registerTracking.amount,
            },
          },
          { new: true }
        );
        if (productData) {
          registerTracking = await registerTracking.findByIdAndDelete(id);
          if (registerTracking === null) {
            resolve({
              status: "ERR",
              message: "The registerTracking is not defined",
            });
          }
        } else {
          return {
            status: "OK",
            message: "ERR",
            id: registerTracking.product,
          };
        }
      });
      const results = await Promise.all(promises);
      const newData = results && results[0] && results[0].id;

      if (newData) {
        resolve({
          status: "ERR",
          message: `San pham voi id: ${newData} khong ton tai`,
        });
      }
      resolve({
        status: "OK",
        message: "success",
        data: registerTracking,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllregisterTracking = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allRegisterTrackings = await RegisterTracking.find().sort({
        createdAt: -1,
        updatedAt: -1,
      });
      resolve({
        status: "200",
        message: "Success",
        data: allRegisterTrackings,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  addRegisterTracking,
  updateregisterTracking,
  getAllRegisterTrackingOfUser,
  getregisterTrackingDetails,
  cancelregisterTrackingDetails,
  getAllregisterTracking,
};
