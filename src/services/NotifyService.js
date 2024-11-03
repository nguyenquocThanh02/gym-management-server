const Notify = require("../models/NotifyModal");

const addNotify = (newNotify) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkToken = await Notify.findOne({ token: newNotify?.token });
      if (checkToken) {
        throw {
          status: 403,
          message: "Token không tồn tại",
        };
      }
      const createdNotify = await Notify.create(newNotify);

      if (createdNotify) {
        resolve({
          status: "201",
          message: "SUCCESS",
          data: createdNotify,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  addNotify,
};
