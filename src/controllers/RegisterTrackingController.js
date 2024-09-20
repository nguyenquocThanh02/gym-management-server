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
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const data = req.params.state;
    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const response = await OrderService.updateOrder(orderId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
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

const getDetailsOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await OrderService.getOrderDetails(orderId);
    return res.status(200).json(response);
  } catch (e) {
    // console.log(e)
    return res.status(404).json({
      message: e,
    });
  }
};

const cancelOrderDetails = async (req, res) => {
  try {
    const data = req.body.orderItems;
    const orderId = req.body.orderId;
    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "The orderId is required",
      });
    }
    const response = await OrderService.cancelOrderDetails(orderId, data);
    return res.status(200).json(response);
  } catch (e) {
    // console.log(e)
    return res.status(404).json({
      message: e,
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

module.exports = {
  addRegisterTracking,
  updateOrder,
  getAllRegisterTrackingOfUser,
  getDetailsOrder,
  cancelOrderDetails,
  getAllRegisterTracking,
};
