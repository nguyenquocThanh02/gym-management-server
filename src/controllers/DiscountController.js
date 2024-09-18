const DiscountService = require("../services/DiscountService");

const addDiscount = async (req, res) => {
  try {
    const { name, percent, validFrom, validTo } = req.body;
    if (!name || !percent || !validFrom || !validTo) {
      return res.status(400).json({
        status: "400",
        message: "The name, percent, validFrom, validTo is required",
      });
    }

    const response = await DiscountService.addDiscount(req.body);
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

const updateDiscount = async (req, res) => {
  try {
    const DiscountId = req.params.id;
    if (!DiscountId) {
      return res.status(400).json({
        status: "400",
        message: "The Discount Id is required",
      });
    }
    const response = await DiscountService.updateDiscount(DiscountId, req.body);
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

const changeStatusDiscount = async (req, res) => {
  try {
    const DiscountId = req.params.id;
    const status = req.params.status;

    if (!DiscountId) {
      return res.status(400).json({
        status: "400",
        message: "The Discount is required",
      });
    }

    const response = await DiscountService.changeStatusDiscount(
      DiscountId,
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

const getAllDiscount = async (req, res) => {
  try {
    const response = await DiscountService.getAllDiscount();
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

const getActiveDiscount = async (req, res) => {
  try {
    const response = await DiscountService.getActiveDiscount();
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

const getPopularDiscount = async (req, res) => {
  try {
    const response = await DiscountService.getPopularDiscount();
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

const getDetailsDiscount = async (req, res) => {
  try {
    const DiscountId = req.params.id;
    if (!DiscountId) {
      return res.status(400).json({
        status: "400",
        message: "The Discount id is required",
      });
    }
    const response = await DiscountService.getDetailsDiscount(DiscountId);
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

const deleteDiscount = async (req, res) => {
  try {
    const DiscountId = req.params.id;
    if (!DiscountId) {
      return res.status(200).json({
        status: "ERR",
        message: "The Discount id is required",
      });
    }
    const response = await DiscountService.deleteDiscount(DiscountId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  addDiscount,
  getAllDiscount,
  getDetailsDiscount,
  getActiveDiscount,
  getPopularDiscount,
  updateDiscount,
  changeStatusDiscount,
  deleteDiscount,
};
