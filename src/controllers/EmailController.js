const EmailService = require("../services/EmailService");

const EmailController = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const response = await EmailService(email);
      return res.json(response);
    }
    return res.json({
      status: "err",
      message: "The email is required",
    });
  } catch (e) {
    return res.json({
      status: "err",
    });
  }
};

module.exports = EmailController;
