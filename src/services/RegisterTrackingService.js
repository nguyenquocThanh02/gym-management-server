const RegisterTracking = require("../models/RegisterTrackingModal");
const Package = require("../models/PackageModal");
const User = require("../models/UserModel");
const Artical = require("../models/ArticalModal");
const EmailService = require("../services/EmailService");
const { checkTimeCancel } = require("./UtilsService");
// const {
//   getAllForCalendar,
// } = require("../controllers/RegisterTrackingController");

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

      console.log("herreee0");

      if (!packageData) {
        return reject({
          status: "403",
          message: "Gói tập không có sẵn",
        });
      }

      try {
        console.log("herreee1", newTracking);

        const createdRegisterTracking = await RegisterTracking.create(
          newTracking
        );

        if (user?.idUser) {
          await User.findOneAndUpdate(
            { email: user?.email },
            { core: 4 },
            { new: true }
          );
        }
        console.log("herreee2");

        await EmailService.EmailConfirm(user?.email, {
          namePackage: package?.name,
          totalPrice: totalPrice,
          nameUser: user?.fullName,
          timeStart: timeStart,
          timeEnd: timeEnd,
          isPaid: isPaid,
        });
        console.log(
          "🚀 ~ returnnewPromise ~ createdRegisterTracking:",
          createdRegisterTracking
        );

        resolve({
          status: 201,
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

const addPTtoRT = (id, idPT) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(id, idPT);
      const updateRT = await RegisterTracking.findByIdAndUpdate(
        id,
        { idPT: idPT },
        { new: true }
      );
      console.log(updateRT);

      resolve({
        status: "200",
        message: "SUCCESS",
        data: updateRT,
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
      console.log("id:", id);
      console.log("Type of id:", typeof id);
      const registerTracking = await RegisterTracking.findById({
        _id: id,
      });
      console.log("test: ", registerTracking);
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
const getDetailsByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let registerTracking = await RegisterTracking.find({
        "user.fullName": name,
      });

      if (registerTracking?.length < 1) {
        registerTracking = await RegisterTracking.find({
          _id: name,
        });
      }

      if (registerTracking?.length < 1) {
        throw {
          status: "403",
          message: "The registerTracking is not defined",
        };
      }

      resolve({
        status: 200,
        message: "SUCCESS",
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
      console.log(theRT);
      if (!theRT) {
        return reject({
          status: 403,
          message: "The register tracking is not defined",
        });
      }

      if (theRT.paidAt || !checkTimeCancel(theRT.timeStart)) {
        throw {
          status: 403,
          message:
            "Bạn không thể huỷ gói tập khi đã thanh toán hoặc vượt quá 2 ngày",
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

      if (theRT?.user?.idUser) {
        await User.findOneAndUpdate(
          { email: theRT?.user?.email },
          { core: 0 },
          { new: true }
        );
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
const getAllForCalendar = () => {
  return new Promise(async (resolve, reject) => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    try {
      const records = await RegisterTracking.find({
        createdAt: {
          $gte: todayStart,
          $lte: todayEnd,
        },
      })
        .populate({
          path: "package.idPackage",
          select: "sessionWithPT type",
        })
        .select("timeStart timeEnd user package idPT")
        .sort({ createdAt: -1 })
        .lean();

      // console.log("here", records);

      const records2 = await RegisterTracking.find({
        timeEnd: {
          $gte: todayEnd,
        },
      })
        .populate({
          path: "package.idPackage",
          select: "sessionWithPT type",
        })
        .select("timeStart timeEnd user package idPT")
        .sort({ createdAt: -1 })
        .lean();

      console.log(records2);
      resolve({
        status: "200",
        message: "Success",
        data: {
          today: records,
          all: records2,
        },
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

      const amountUser = await User.countDocuments({
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      });

      const amountArtical = await Artical.countDocuments({
        createdAt: {
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
          amountArtical: amountArtical,
          amountUser: amountUser,
          registerTrackings: registerTrackings,
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
      const packageCount = {};

      registerTrackings.forEach((tracking) => {
        const packageName = tracking.package.name;
        console.log(
          "🚀 ~ registerTrackings.forEach ~ packageName:",
          packageName
        );

        if (!packageCount[packageName]) {
          packageCount[packageName] = 0;
        }
        packageCount[packageName]++;

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

      const packageStats = Object.keys(packageCount).map((packageName) => ({
        packageName,
        count: packageCount[packageName],
      }));

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
        data: {
          chart: chartData,
          package: packageStats,
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  addRegisterTracking,
  addPTtoRT,
  paymentRegisterTracking,
  getAllRegisterTrackingOfUser,
  getDetailsRegisterTracking,
  cancelRegisterTracking,
  getAllRegisterTracking,
  getChartDate,
  getChartMonth,
  getDetailsByName,
  getAllForCalendar,
};
