const DeviceService = require("../services/DeviceService");

const addDevice = async (req, res) => {
  try {
    const { name, type, image } = req.body;
    if (!name || !type || !image) {
      return res.status(400).json({
        status: "400",
        message: "The name, type, image is required",
      });
    }
    const response = await DeviceService.addDevice(req.body);
    return res.status(201).json(response);
  } catch (e) {
    if (e?.status) {
      return res.status(e?.status).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
};

const updateDevice = async (req, res) => {
  try {
    const DeviceId = req.params.id;
    if (!DeviceId) {
      return res.status(400).json({
        status: "ERR",
        message: "The Device Id is required",
      });
    }
    const response = await DeviceService.updateDevice(DeviceId, req.body);
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

const changeStatusDevice = async (req, res) => {
  try {
    const DeviceId = req.params.id;
    const status = req.params.status;

    if (!DeviceId) {
      return res.status(200).json({
        status: "ERR",
        message: "The Device is required",
      });
    }

    const response = await DeviceService.changeStatusDevice(DeviceId, status);
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

const getAllDevice = async (req, res) => {
  try {
    const response = await DeviceService.getAllDevice();
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

const getDetailsDevice = async (req, res) => {
  try {
    const DeviceId = req.params.id;
    if (!DeviceId) {
      return res.status(400).json({
        status: "400",
        message: "The Device id is required",
      });
    }
    const response = await DeviceService.getDetailsDevice(DeviceId);
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

const deleteDevice = async (req, res) => {
  try {
    const deviceId = req.params.id;
    if (!deviceId) {
      return res.status(200).json({
        status: "ERR",
        message: "The device id is required",
      });
    }
    const response = await DeviceService.deleteDevice(deviceId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  addDevice,
  getAllDevice,
  getDetailsDevice,
  updateDevice,
  changeStatusDevice,
  deleteDevice,
};
