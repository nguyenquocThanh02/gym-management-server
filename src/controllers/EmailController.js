const EmailService = require("../services/EmailService");

const EmailRegister = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const response = await EmailService.EmailReset(email);
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

module.exports = { EmailRegister };
