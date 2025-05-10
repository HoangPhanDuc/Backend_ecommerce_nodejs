import categoryModel from "../model/categoryModel.js";

export const addCategoryService = async (name, status) => {
  try {
    const addedCategory = await categoryModel.create({
      name: name,
      status: status,
    });
    return addedCategory;
  } catch (error) {
    throw error;
  }
};

export const getAllCategoryService = async () => {
  try {
    const getAllCategories = await categoryModel.findAll({});
    return getAllCategories;
  } catch (error) {
    throw error;
  }
};

export const updateCategoryService = async (name, status, id) => {
  try {
    const updatedCategory = await categoryModel.update(
      { name: name, status: status },
      { where: { id: id } }
    );
    return updatedCategory;
  } catch (error) {
    throw error;
  }
};

export const findByIdCategoryService = async (id) => {
  try {
    const findByIdCategory = await categoryModel.findOne({
      where: { id: id },
    });
    return findByIdCategory;
  } catch (error) {
    throw error;
  }
};

export const deleteCategoryService = async (id) => {
  try {
    const detetedCategory = await categoryModel.destroy({
      where: { id: id },
    });
    return detetedCategory;
  } catch (error) {
    throw error;
  }
};
