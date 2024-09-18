const Discount = require("../models/DiscountModal");
const Package = require("../models/PackageModal");
const { checkValidTime } = require("./UtilsService");

const addDiscount = (newDiscount) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdDiscount = await Discount.create(newDiscount);

      if (createdDiscount) {
        resolve({
          status: "201",
          message: "SUCCESS",
          data: createdDiscount,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsDiscount = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const theDiscount = await Discount.findOne({
        _id: id,
      });
      if (theDiscount === null) {
        throw {
          status: "400",
          message: "The Discount is not defined",
        };
      }

      resolve({
        status: "200",
        message: "SUCCESS",
        data: theDiscount,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllDiscount = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const Discounts = await Discount.find();

      resolve({
        status: "200",
        message: "SUCCESS",
        data: Discounts,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getActiveDiscount = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const Discounts = await Discount.find({
        status: "active",
      });

      if (Discounts?.length > 0) {
        const validDiscounts = Discounts.filter((discount) =>
          checkValidTime(discount.validFrom, discount.validTo)
        );

        if (validDiscounts?.length > 0) {
          resolve({
            status: "200",
            message: "SUCCESS",
            data: validDiscounts,
          });
        }
      }
      resolve({
        status: "204",
        message: "SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateDiscount = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkExistDiscount = await Discount.findOne({
        _id: id,
      });
      if (checkExistDiscount === null) {
        throw {
          status: "400",
          message: "The Discount is not defined",
        };
      }
      const checkNameDiscount = await Discount.findOne({
        name: data?.name,
      });
      if (checkNameDiscount && checkNameDiscount?.id !== id) {
        throw {
          status: "400",
          message: "The Discount Name is already exist",
        };
      }

      console.log("date: ", data?.validFrom);
      const updatedDiscount = await Discount.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "200",
        message: "SUCCESS",
        data: updatedDiscount,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const changeStatusDiscount = (id, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkExistDiscount = await Discount.findOne({
        _id: id,
      });
      if (checkExistDiscount === null) {
        throw {
          status: "400",
          message: "The Discount is not defined",
        };
      }

      await Discount.findByIdAndUpdate(id, { status: status }, { new: true });
      resolve({
        status: "200",
        message: "Change status success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteDiscount = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkDiscount = await Discount.findOne({
        _id: id,
      });
      if (checkDiscount === null) {
        reject({
          status: "400",
          message: "The Discount is not defined",
        });
      }

      await Discount.findByIdAndDelete(id);
      resolve({
        status: "200",
        message: "Delete Discount success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  addDiscount,
  updateDiscount,
  changeStatusDiscount,
  getDetailsDiscount,
  getAllDiscount,
  getActiveDiscount,
  deleteDiscount,
};
