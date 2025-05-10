import adminModel from "../model/adminModel.js";

export const authAdmin = async (email) => {
  try {
    const dataAmin = await adminModel.findOne({
      where: { email: email },
    });
    return dataAmin;
  } catch (error) {
    throw error;
  }
};

export const validateAdminByEmail = async (email) => {
  try {
    const validateByEmail = await adminModel.findOne({
      where: { email: email },
    });
    return validateByEmail;
  } catch (error) {
    throw error;
  }
};

export const registerAdmin = async (email, password) => {
  try {
    const registAdmin = await adminModel.create({
      email: email,
      password: password,
    });
    return registAdmin;
  } catch (error) {
    throw error;
  }
};

export const saveRefreshTokenAdminService = async (token, id) => {
  try {
    const saveRefreshToken = await adminModel.update(
      { refresh_token: token },
      { where: { id: id } }
    );
    return saveRefreshToken;
  } catch (error) {
    throw error;
  }
};
