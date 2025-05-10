import {
  addCategoryService,
  deleteCategoryService,
  findByIdCategoryService,
  getAllCategoryService,
  updateCategoryService,
} from "../service/categoryService.js";

export const addCategoryController = async (req, res) => {
  const { name, status } = req.body;
  try {
    const addNewCategory = await addCategoryService(name, status);
    return res.status(201).json({
      status: true,
      mess: "added new category successful!",
      results: addNewCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Error added new category!" });
  }
};

export const getAllCategoryController = async (req, res) => {
  try {
    const results = await getAllCategoryService();
    return res.status(200).json({ status: true, results: results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Error got all category!" });
  }
};

export const updateCategoryController = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  try {
    const updateCategory = await updateCategoryService(name, status, id);
    return res.status(200).json({
      status: true,
      mess: "updated successful!",
      results: updateCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Error updated category!" });
  }
};

export const deleteCategoryController = async (req, res) => {
  const { id } = req.params;
  try {
    const checkId = await findByIdCategoryService(id);
    if (!checkId) {
      return res
        .status(500)
        .json({ status: false, mess: "Error, id category is not valid!" });
    }
    const deleteCategory = await deleteCategoryService(id);
    return res.status(200).json({
      status: true,
      mess: "Deleted successful!",
      results: deleteCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Error deleted category!" });
  }
};
