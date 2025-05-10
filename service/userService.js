import userModel from "../model/usersModel.js";

export const getAllUsersService = async () => {
  try {
    const getAllUsers = await userModel.findAll({});
    return getAllUsers;
  } catch (error) {
    throw error;
  }
};

export const getUserByIdService = async (id) => {
  try {
    const getUserById = await userModel.findByPk(id);
    return getUserById;
  } catch (error) {
    throw error;
  }
};

export const deleteUserService = async (id) => {
  try {
    const deletedUser = await userModel.destroy({
      where: { id: id },
    });
    return deletedUser;
  } catch (error) {
    throw error;
  }
};

// ---------------------------------------------------
export const userLoginService = async (email) => {
  try {
    const dataUser = await userModel.findOne({
      where: { email: email },
    });
    return dataUser;
  } catch (error) {
    throw error;
  }
};

export const validateUserService = async (email) => {
  try {
    const validateUser = await userModel.findOne({
      where: { email: email },
    });
    return validateUser;
  } catch (error) {
    throw error;
  }
};

export const registerUserService = async (name, email, password) => {
  try {
    const registerUser = await userModel.create({
      name: name,
      email: email,
      password: password,
    });
    return registerUser;
  } catch (error) {
    throw error;
  }
};

export const saveRefreshTokenService = async (token, id) => {
  try {
    const saveRefreshToken = await userModel.update(
      { refresh_token: token },
      { where: { id: id } }
    );
    return saveRefreshToken;
  } catch (error) {
    throw error;
  }
};

export const refreshTokenService = async (id, token) => {
  try {
    const newRefreshToken = await userModel.update(
      {
        refresh_token: token,
      },
      { where: { id: id } }
    );
    return newRefreshToken;
  } catch (error) {
    throw error;
  }
};
