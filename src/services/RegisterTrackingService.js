const RegisterTracking = require("../models/RegisterTrackingModal");
const Package = require("../models/PackageModal");
const EmailService = require("../services/EmailService");
const { checkTimeCancel } = require("./UtilsService");

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

const paymentRegisterTracking = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedregisterTracking = await RegisterTracking.findByIdAndUpdate(
        id,
        { isPaid: true, paidAt: new Date(Date.now()) },
        { new: true }
      );
      resolve({
        status: "200",
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
        "user.idUser": id,
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

const getDetailsRegisterTracking = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const registerTracking = await RegisterTracking.findById({
        _id: id,
      });
      if (registerTracking === null) {
        throw {
          status: "403",
          message: "The registerTracking is not defined",
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

const cancelRegisterTracking = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const theRT = await RegisterTracking.findOne({ _id: id });
      if (!theRT) {
        return reject({
          status: 403,
          message: "The register tracking is not defined",
        });
      }

      if (theRT.paidAt || !checkTimeCancel(theRT.timeStart)) {
        throw {
          status: 403,
          message: "Can not cancel if order paid or pass time start",
        };
      }
      const thePackage = await Package.findOneAndUpdate(
        { _id: theRT.package.idPackage },
        {
          $inc: {
            stock: 1,
            register: -1,
          },
        },
        { new: true }
      );

      if (!thePackage) {
        return resolve({
          status: 200,
          message: "Package not updated, but success",
        });
      }

      const deletedRT = await RegisterTracking.findByIdAndDelete(id);
      if (!deletedRT) {
        return reject({
          status: 403,
          message: "Failed to delete the register tracking",
        });
      }

      resolve({
        status: 200,
        message: "Success",
      });
    } catch (e) {
      reject({
        status: e.status || 500,
        message: e.message || "An unexpected error occurred.",
      });
    }
  });
};

// const getAllRegisterTracking = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const allRegisterTrackings = await RegisterTracking.find().sort({
//         createdAt: -1,
//         updatedAt: -1,
//       });
//       resolve({
//         status: "200",
//         message: "Success",
//         data: allRegisterTrackings,
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

const getAllRegisterTracking = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allRegisterTrackings = await RegisterTracking.find().sort({
        createdAt: -1,
        updatedAt: -1,
      });

      const flattenedData = allRegisterTrackings.map((tracking) => ({
        _id: tracking._id,
        packageName: tracking.package.name,
        packageId: tracking.package.idPackage,
        packagePrice: tracking.package.price,
        userFullName: tracking.user.fullName,
        userEmail: tracking.user.email,
        userId: tracking.user.idUser,
        userPhone: tracking.user.phone,
        payerName: tracking?.payment?.payerName,
        payerEmail: tracking?.payment?.payerEmail,
        payerId: tracking?.payment?.payerId,
        orderId: tracking?.payment?.orderId,
        paidAt: tracking?.paidAt,
        paymentMethod: tracking.paymentMethod,
        totalPrice: tracking.totalPrice,
        isPaid: tracking.isPaid,
        timeStart: tracking.timeStart,
        timeEnd: tracking.timeEnd,
        status: tracking.status,
        createdAt: tracking.createdAt,
        updatedAt: tracking.updatedAt,
      }));

      resolve({
        status: "200",
        message: "Success",
        data: flattenedData,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getChartDate = (theDate) => {
  return new Promise(async (resolve, reject) => {
    try {
      const startDate = new Date(theDate);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      const registerTrackings = await RegisterTracking.find({
        paidAt: {
          $gte: startDate,
          $lt: endDate,
        },
      });

      const totalPricePaypal = registerTrackings.reduce((accumulator, item) => {
        if (item.paymentMethod === "paypal") {
          return accumulator + item.totalPrice;
        }
        return accumulator;
      }, 0);

      const totalPriceOffline = registerTrackings.reduce(
        (accumulator, item) => {
          if (item.paymentMethod === "offline") {
            return accumulator + item.totalPrice;
          }
          return accumulator;
        },
        0
      );

      resolve({
        status: "200",
        message: "Success",
        data: {
          paypal: totalPricePaypal,
          offline: totalPriceOffline,
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getChartMonth = (theMonth) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [year, month] = theMonth.split("-").map(Number);
      const daysInMonth = new Date(year, month, 0).getDate();

      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);

      const registerTrackings = await RegisterTracking.find({
        paidAt: {
          $gte: startDate,
          $lt: endDate,
        },
        isPaid: true,
      });

      const dailyData = {};

      registerTrackings.forEach((tracking) => {
        const dateKey = tracking.paidAt.toISOString().split("T")[0];
        const isPaypal = tracking.paymentMethod === "paypal";

        if (!dailyData[dateKey]) {
          dailyData[dateKey] = { date: dateKey, paypal: 0, offline: 0 };
        }

        if (isPaypal) {
          dailyData[dateKey].paypal += tracking.totalPrice;
        } else {
          dailyData[dateKey].offline += tracking.totalPrice;
        }
      });

      const chartData = [];
      for (let day = 2; day <= daysInMonth + 1; day++) {
        const date = new Date(year, month - 1, day);
        const formattedDate = date.toISOString().split("T")[0];

        chartData.push({
          date: formattedDate,
          paypal: dailyData[formattedDate]?.paypal || 0,
          offline: dailyData[formattedDate]?.offline || 0,
        });
      }

      resolve({
        status: 200,
        message: "Success",
        data: chartData,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  addRegisterTracking,
  paymentRegisterTracking,
  getAllRegisterTrackingOfUser,
  getDetailsRegisterTracking,
  cancelRegisterTracking,
  getAllRegisterTracking,
  getChartDate,
  getChartMonth,
};
