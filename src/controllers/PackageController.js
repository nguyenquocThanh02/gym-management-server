const PackageService = require("../services/PackageService");

const addPackage = async (req, res) => {
  try {
    const { name, price, duration } = req.body;
    if (!name || !price || !duration) {
      return res.status(400).json({
        status: "400",
        message: "The name, price, duration is required",
      });
    }

    const response = await PackageService.addPackage(req.body);
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

const updatePackage = async (req, res) => {
  try {
    const PackageId = req.params.id;
    if (!PackageId) {
      return res.status(400).json({
        status: "400",
        message: "The Package Id is required",
      });
    }
    const response = await PackageService.updatePackage(PackageId, req.body);
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

const changeStatusPackage = async (req, res) => {
  try {
    const PackageId = req.params.id;
    const status = req.params.status;

    if (!PackageId) {
      return res.status(400).json({
        status: "400",
        message: "The Package is required",
      });
    }

    const response = await PackageService.changeStatusPackage(
      PackageId,
      status
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

const getAllPackage = async (req, res) => {
  try {
    const response = await PackageService.getAllPackage();
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

const getPopularPackage = async (req, res) => {
  try {
    const response = await PackageService.getPopularPackage();
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

const getDetailsPackage = async (req, res) => {
  try {
    const PackageId = req.params.id;
    if (!PackageId) {
      return res.status(400).json({
        status: "400",
        message: "The Package id is required",
      });
    }
    const response = await PackageService.getDetailsPackage(PackageId);
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

const deletePackage = async (req, res) => {
  try {
    const PackageId = req.params.id;
    if (!PackageId) {
      return res.status(200).json({
        status: "ERR",
        message: "The Package id is required",
      });
    }
    const response = await PackageService.deletePackage(PackageId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  addPackage,
  getAllPackage,
  getDetailsPackage,
  getPopularPackage,
  updatePackage,
  changeStatusPackage,
  deletePackage,
};
