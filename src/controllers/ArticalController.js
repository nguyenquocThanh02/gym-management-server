const ArticalService = require("../services/ArticalService");

const addNewArtical = async (req, res) => {
  try {
    const { title, coverImage, userId, content } = req.body;

    if (!title || !coverImage || !userId) {
      return res.status(400).json({
        status: 400,
        message: "The title, coverImage, userId is required",
      });
    }
    if (content?.length > 10000) {
      return res.status(400).json({
        status: 400,
        message: "The maximum length of content is 10000 characters.",
      });
    }
    const response = await ArticalService.addNewArtical(req.body);
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
const getAllArticals = async (req, res) => {
  try {
    const statusGet = req.params?.status || null;
    const response = await ArticalService.getAllArticals(statusGet);
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

const getNewArticals = async (req, res) => {
  try {
    const response = await ArticalService.getNewArticals();
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

const getDetailsArtical = async (req, res) => {
  try {
    const articalId = req.params.id;
    const response = await ArticalService.getDetailsArtical(articalId);
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

const changeStatusArtical = async (req, res) => {
  try {
    const articalId = req.params.id;
    const statusChange = req.params.status;
    const response = await ArticalService.changeStatusArtical(
      articalId,
      statusChange
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
const deleteArtical = async (req, res) => {
  try {
    const articalId = req.params.id;
    const response = await ArticalService.deleteArtical(articalId);
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
  addNewArtical,
  getAllArticals,
  getNewArticals,
  getDetailsArtical,
  deleteArtical,
  changeStatusArtical,
};
