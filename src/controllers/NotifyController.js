const NotifyService = require("../services/NotifyService");

const addNotify = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        status: "400",
        message: "The token is required",
      });
    }

    const response = await NotifyService.addNotify(req.body);
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

module.exports = {
  addNotify,
};
