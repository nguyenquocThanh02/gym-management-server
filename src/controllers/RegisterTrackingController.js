const RegisterTrackingService = require("../services/RegisterTrackingService");

const addRegisterTracking = async (req, res) => {
  try {
    const { package, user, totalPrice, timeStart, timeEnd } = req.body;
    if (
      !package?.idPackage ||
      !user?.email ||
      !totalPrice ||
      !timeStart ||
      !timeEnd
    ) {
      return res.status(400).json({
        status: "400",
        message: "The input is required",
      });
    }
    const response = await RegisterTrackingService.addRegisterTracking(
      req.body
    );
    return res.status(200).json(response);
  } catch (e) {
    if (e?.status) {
      return res.status(e?.status).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
};
const paymentRegisterTracking = async (req, res) => {
  try {
    const registerTrackingId = req.params.id;
    if (!registerTrackingId) {
      return res.status(400).json({
        status: "400",
        message: "The id is required",
      });
    }
    const response = await RegisterTrackingService.paymentRegisterTracking(
      registerTrackingId
    );
    return res.status(200).json(response);
  } catch (e) {
    if (e?.status) {
      return res.status(e?.status).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
};
const getAllRegisterTrackingOfUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        status: "400",
        message: "The userId is required",
      });
    }
    const response = await RegisterTrackingService.getAllRegisterTrackingOfUser(
      userId
    );
    return res.status(200).json(response);
  } catch (e) {
    if (e?.status) {
      return res.status(e?.status).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
};

const getDetailsRegisterTracking = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(400).json({
        status: "400",
        message: "The id is required",
      });
    }
    const response = await RegisterTrackingService.getDetailsRegisterTracking(
      orderId
    );
    return res.status(200).json(response);
  } catch (e) {
    if (e?.status) {
      return res.status(e?.status).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
};

const cancelRegisterTracking = async (req, res) => {
  try {
    // const data = req.body.orderItems;
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(400).json({
        status: "400",
        message: "The orderId is required",
      });
    }
    const response = await RegisterTrackingService.cancelRegisterTracking(
      orderId
    );
    return res.status(200).json(response);
  } catch (e) {
    if (e?.status) {
      return res.status(e?.status).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
};

const getAllRegisterTracking = async (req, res) => {
  try {
    const data = await RegisterTrackingService.getAllRegisterTracking();
    return res.status(200).json(data);
  } catch (e) {
    if (e?.status) {
      return res.status(e?.status).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
};

const getChartDate = async (req, res) => {
  try {
    const theDate = req.params.date;
    if (!theDate) {
      return res.status(400).json({ message: "Date is required." });
    }
    const data = await RegisterTrackingService.getChartDate(theDate);
    return res.status(200).json(data);
  } catch (e) {
    if (e?.status) {
      return res.status(e?.status).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
};

const getChartMonth = async (req, res) => {
  try {
    const theMonth = req.params.month;
    if (!theMonth) {
      return res.status(400).json({ message: "Time from and to is required." });
    }
    const data = await RegisterTrackingService.getChartMonth(theMonth);
    return res.status(200).json(data);
  } catch (e) {
    if (e?.status) {
      return res.status(e?.status).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
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
