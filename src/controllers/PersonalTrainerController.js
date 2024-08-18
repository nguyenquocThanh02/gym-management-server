const PersonalTrainerService = require("../services/PersonalTrainer.service");

const addPT = async (req, res) => {
  try {
    const { name, specialty, contactInfo, address } = req.body;
    if (!name || !specialty || !contactInfo?.phone || !address) {
      return res.status(400).json({
        status: "400",
        message: "The input is required",
      });
    }
    const response = await PersonalTrainerService.addPT(req.body);
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

const updatePT = async (req, res) => {
  try {
    const ptId = req.params.id;
    if (!ptId) {
      return res.status(400).json({
        status: "ERR",
        message: "The ptId is required",
      });
    }
    const response = await PersonalTrainerService.updatePT(ptId, req.body);
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

const changeStatusPT = async (req, res) => {
  try {
    const ptId = req.params.id;
    const status = req.params.status;

    if (!ptId) {
      return res.status(200).json({
        status: "ERR",
        message: "The pt is required",
      });
    }

    const response = await PersonalTrainerService.changeStatusPT(ptId, status);
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

const getAllPT = async (req, res) => {
  try {
    const response = await PersonalTrainerService.getAllPT();
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

const getDetailsPT = async (req, res) => {
  try {
    const ptId = req.params.id;
    if (!ptId) {
      return res.status(400).json({
        status: "400",
        message: "The PT id is required",
      });
    }
    const response = await PersonalTrainerService.getDetailsPT(ptId);
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

module.exports = {
  addPT,
  getAllPT,
  getDetailsPT,
  updatePT,
  changeStatusPT,
};
