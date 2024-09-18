const Package = require("../models/PackageModal");
const Discount = require("../models/DiscountModal");
const { checkValidTime } = require("./UtilsService");
const { disconnect } = require("mongoose");

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

      const Discounts = await Discount.find({
        status: "active",
      });

      let applicableDiscounts = [];
      if (Discounts?.length > 0) {
        const validDiscounts = Discounts.filter((discount) =>
          checkValidTime(discount.validFrom, discount.validTo)
        );

        if (validDiscounts?.length > 0) {
          applicableDiscounts = validDiscounts.filter((discount) =>
            discount?.packages.includes(thePackage._id)
          );
        }
      }

      resolve({
        status: "200",
        message: "SUCCESS",
        data: {
          packages: thePackage,
          discount: applicableDiscounts,
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllPackage = async () => {
  try {
    const packages = await Package.find();
    const Discounts = await Discount.find({
      status: "active",
    });
    let validDiscounts = [];
    if (Discounts?.length > 0) {
      validDiscounts = Discounts.filter((discount) =>
        checkValidTime(discount.validFrom, discount.validTo)
      );
    }

    let applicableDiscounts = [];
    const packageDetailsPromises = packages.map(async (pkg) => {
      if (validDiscounts?.length > 0) {
        applicableDiscounts = validDiscounts.filter((discount) =>
          discount?.packages.includes(pkg._id)
        );
      }
      return {
        packages: { ...pkg._doc },
        discount: applicableDiscounts,
      };
    });

    const packagesWithDiscounts = await Promise.all(packageDetailsPromises);

    return {
      status: "200",
      message: "SUCCESS",
      data: packagesWithDiscounts,
    };
  } catch (e) {
    // Xử lý lỗi
    throw e;
  }
};

const getAllPackageName = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const Packages = await Package.find();
      const arrsPackageName = Packages.map((pkg) => ({
        id: pkg.id,
        name: pkg.name,
      }));

      resolve({
        status: "200",
        message: "SUCCESS",
        data: arrsPackageName,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getPopularPackage = async () => {
  try {
    const packages = await Package.find();

    const sortedPackages = packages
      .sort((a, b) => b.register - a.register)
      .slice(0, 3);

    const Discounts = await Discount.find({
      status: "active",
    });
    let validDiscounts = [];
    if (Discounts?.length > 0) {
      validDiscounts = Discounts.filter((discount) =>
        checkValidTime(discount.validFrom, discount.validTo)
      );
    }

    let applicableDiscounts = [];
    const packageDetailsPromises = sortedPackages.map(async (pkg) => {
      if (validDiscounts?.length > 0) {
        applicableDiscounts = validDiscounts.filter((discount) =>
          discount?.packages.includes(pkg._id)
        );
      }
      return {
        packages: { ...pkg._doc },
        discount: applicableDiscounts,
      };
    });

    const packagesWithDiscounts = await Promise.all(packageDetailsPromises);

    return {
      status: "200",
      message: "SUCCESS",
      data: packagesWithDiscounts,
    };
  } catch (e) {
    return {
      status: "500",
      message: "ERROR",
      error: e.message,
    };
  }
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
  getAllPackageName,
  getPopularPackage,
  deletePackage,
};
