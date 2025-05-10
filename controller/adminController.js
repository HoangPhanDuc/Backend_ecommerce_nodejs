import {
  authAdmin,
  registerAdmin,
  saveRefreshTokenAdminService,
  validateAdminByEmail,
} from "../service/adminService.js";
import {
  comparePassword,
  createAccessToken,
  createRefreshToken,
  hashingPassword,
  verifyToken,
} from "../utils/handletoken.js";
import {
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
} from "../service/userService.js";

export const authController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await authAdmin(email);
    if (!admin.dataValues) {
      return res.status(401).json({ message: "Invalid your account!" });
    }
    const checkUser = comparePassword(password, admin.password);
    if (!checkUser) {
      return res.status(401).json({ message: "Invalid your password!" });
    }
    const accessToken = createAccessToken(admin);
    const refreshToken = createRefreshToken(admin);
    await saveRefreshTokenAdminService(refreshToken, admin.id);
    return res.status(200).json({
      message: "Login successful!",
      results: { ...admin.dataValues, accessToken, refreshToken },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occurred", error });
  }
};

export const regController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid email or password?" });
    }
    const validateEmail = await validateAdminByEmail(email);
    if (validateEmail) {
      return res.status(409).json({ message: "Email has been registered!" });
    }
    const hashPassword = hashingPassword(password, 10);
    await registerAdmin(email, hashPassword);
    return res.status(201).json({ message: "successful!" });
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

export const refreshTokenController = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required!" });
  }

  try {
    const decoded = verifyToken(refreshToken);
    const admin = await refreshTokenService(decoded.id, decoded.refreshToken);
    if (!admin) {
      return res.status(403).json({ message: "Invalid refresh token!" });
    }
    const payload = { id: decoded.id, email: decoded.email };
    const newAccessToken = createAccessToken(payload);
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Invalid refresh token!" });
  }
};

//admin manage user
export const getAllUserController = async (req, res) => {
  try {
    const result = await getAllUsersService();
    return res.status(200).json({
      status: true,
      mess: "Get all users successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Error got all users" });
  }
};

export const getByIdUserController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getUserByIdService(id);
    if (!result) {
      return res.status(404).json({ status: false, mess: "Can not find user" });
    }
    return res.status(200).json({
      status: true,
      mess: "Get by id user successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Error got user by ID" });
  }
};

export const deleteUserController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteUserService(id);
    if (!result) {
      return res
        .status(404)
        .json({ status: false, mess: "Can not find and delete user" });
    }
    return res.status(200).json({
      status: true,
      mess: "Deleted user successfully!",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, mess: "Error deleted user successfully" });
  }
};
