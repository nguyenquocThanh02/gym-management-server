const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

const register = async (req, res) => {
  try {
    const { email, password, phone } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password || !phone) {
      return res.status(400).json({
        status: "400",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(400).json({
        status: "400",
        message: "Invalid email format",
      });
    }
    const response = await UserService.register(req.body);
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
const createPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        status: "400",
        message: "The password is required",
      });
    }

    const response = await UserService.createPassword(req.body);
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

const login = async (req, res) => {
  try {
    const { account, password } = req.body;
    const role = req?.params?.role || "";

    if (!password || !account) {
      return res.status(400).json({
        status: "400",
        message: "The input is required",
      });
    }

    const response = await UserService.login(req.body, role);
    // res.cookie("jwt", response.access_token, { httpOnly: true });
    return res.status(200).json(response);
  } catch (e) {
    if (e?.status) {
      return res.status(parseInt(e?.status, 10)).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
};

const inviteAccount = async (req, res) => {
  try {
    const email = req?.params?.email || "";

    if (!email) {
      return res.status(400).json({
        status: "400",
        message: "The email is required",
      });
    }

    const response = await UserService.inviteAccount(email);
    // res.cookie("jwt", response.access_token, { httpOnly: true });
    return res.status(200).json(response);
  } catch (e) {
    if (e?.status) {
      return res.status(parseInt(e?.status, 10)).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
};
const reset = async (req, res) => {
  try {
    const email = req.params.email || "";

    if (!email) {
      return res.status(400).json({
        status: "400",
        message: "The email is required",
      });
    }

    const response = await UserService.reset(email);
    return res.status(200).json(response);
  } catch (e) {
    if (e?.status) {
      return res.status(parseInt(e?.status, 10)).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        status: "400",
        message: "The userId is required",
      });
    }
    const response = await UserService.updateUser(userId, req.body);
    return res.status(200).json(response);
  } catch (e) {
    if (e?.status) {
      return res.status(parseInt(e?.status, 10)).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
};

const changeStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const status = req.params.status;

    if (!userId) {
      return res.status(400).json({
        status: "400",
        message: "The user is required",
      });
    }

    const response = await UserService.changeStatus(userId, status);
    return res.status(200).json(response);
  } catch (e) {
    if (e?.status) {
      return res.status(parseInt(e?.status, 10)).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
};

const changeRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const role = req.params.role;

    if (!userId) {
      return res.status(400).json({
        status: "400",
        message: "The user is required",
      });
    }

    const response = await UserService.changeRole(userId, role);
    return res.status(200).json(response);
  } catch (e) {
    if (e?.status) {
      return res.status(parseInt(e?.status, 10)).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        status: "400",
        message: "The user is required",
      });
    }

    const response = await UserService.changePassword(userId, req.body);
    return res.status(200).json(response);
  } catch (e) {
    if (e?.status) {
      return res.status(parseInt(e?.status, 10)).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    if (e?.status) {
      return res.status(parseInt(e?.status, 10)).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
};

const getAllRoleUser = async (req, res) => {
  try {
    const response = await UserService.getAllRoleUser();
    return res.status(200).json(response);
  } catch (e) {
    if (e?.status) {
      return res.status(parseInt(e?.status, 10)).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
};

const getAllRoleTrainee = async (req, res) => {
  try {
    const response = await UserService.getAllRoleTrainee();
    return res.status(200).json(response);
  } catch (e) {
    if (e?.status) {
      return res.status(parseInt(e?.status, 10)).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
};

const getDetailsUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await UserService.getDetailsUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    if (e?.status) {
      return res.status(parseInt(e?.status, 10)).json(e);
    }
    return res.status(404).json({
      message: "Error not found",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "Logout successfully",
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  register,
  login,
  inviteAccount,
  reset,
  createPassword,
  getAllRoleUser,
  getAllRoleTrainee,
  getDetailsUser,
  updateUser,
  deleteUser,
  logoutUser,
  changeStatus,
  changeRole,
  changePassword,
};
