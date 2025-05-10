import {
  refreshTokenService,
  registerUserService,
  saveRefreshTokenService,
  userLoginService,
  validateUserService,
} from "../service/userService.js";
import { generateOTP, pendingUsers } from "../utils/general.js";
import {
  comparePassword,
  createAccessToken,
  createRefreshToken,
  hashingPassword,
  verifyToken,
} from "../utils/handletoken.js";
import { sendVerificationEmail } from "../utils/mailer.js";

//user
export const userLoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userLoginService(email);
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid your account!" });
    }
    const checkUser = comparePassword(password, user.password);
    if (!checkUser) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid your password!" });
    }
    const accessToken = createAccessToken({ id: user.id, email: email });
    const refreshToken = createRefreshToken({ id: user.id, email: email });
    user.refresh_token = refreshToken;
    await saveRefreshTokenService(refreshToken, user.id);
    return res.status(200).json({
      status: true,
      message: "User login successful!",
      result: { ...user.dataValues, accessToken },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occurred", error });
  }
};

export const userRegController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (pendingUsers.has(email)) {
      return res
        .status(409)
        .json({ status: false, message: "Email is pending verification!" });
    }
    const existingUser = await validateUserService(email);
    if (existingUser) {
      return res
        .status(409)
        .json({ status: false, message: "Email has been registered!" });
    }
    const hashedPassword = hashingPassword(password);
    const otpCode = generateOTP();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

    pendingUsers.set(email, {
      name,
      email,
      hashedPassword,
      otpCode,
      otpExpires,
    });

    const emailSent = await sendVerificationEmail(email, otpCode);
    if (!emailSent) {
      pendingUsers.delete(email);
      return res
        .status(500)
        .json({ message: "Failed to send verification email." });
    }

    return res.status(200).json({
      status: true,
      message: "OTP sent. Please check your email to verify your account.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const verifyEmailController = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const pendingUser = pendingUsers.get(email);
    if (!pendingUser) {
      return res
        .status(404)
        .json({ status: false, message: "No verification request found!" });
    }
    if (String(pendingUser.otpCode) !== String(otp)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid OTP code!" });
    }
    if (new Date() > new Date(pendingUser.otpExpires)) {
      pendingUsers.delete(email);
      return res
        .status(400)
        .json({ status: false, message: "OTP has expired!" });
    }
    await registerUserService(
      pendingUser.name,
      pendingUser.email,
      pendingUser.hashedPassword
    );
    // clear store
    pendingUsers.delete(email);
    return res
      .status(200)
      .json({ status: true, message: "Email verified and user registered!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error." });
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
    return res.status(200).json({ status: true, accessToken: newAccessToken });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ status: false, message: "Invalid refresh token!" });
  }
};
