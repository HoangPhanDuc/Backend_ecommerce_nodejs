import {
  addProductService,
  deleteProductService,
  getAllProductService,
  getImageService,
  updateProductService,
} from "../service/productService.js";
import { removeImage } from "../utils/handleFiles.js";

export const addProductController = async (req, res) => {
  const { name, quantity, old_price, new_price, description, category_id } =
    req.body;
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const imageUrl = req.file ? `${baseUrl}/${req.file.filename}` : null;
  console.log(imageUrl);
  try {
    if (!imageUrl)
      return res
        .status(400)
        .json({ status: false, mess: "Image is required!" });
    const result = await addProductService(
      name,
      quantity,
      old_price,
      new_price,
      description,
      imageUrl,
      category_id
    );
    res.status(201).json({ mess: "Added product successful!", result: result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, mess: "Error added products!", error: error });
  }
};

export const getAllProductController = async (req, res) => {
  try {
    const result = await getAllProductService();
    return res.status(200).json({
      status: true,
      mess: "Get all products successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mess: "Error got all products!" });
  }
};

export const updateProductController = async (req, res) => {
  const { name, quantity, old_price, new_price, description, category_id } =
    req.body;
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const imageUrl = req.file ? `${baseUrl}/${req.file.filename}` : null;
  const { id } = req.params;
  try {
    const result = await updateProductService(
      name,
      quantity,
      old_price,
      new_price,
      description,
      imageUrl,
      category_id,
      id
    );
    res.status(200).json({ mess: "Updated product successful!", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mess: "Error updated products!" });
  }
};

export const deleteProductController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteProductService(id);
    const imagePath = await getImageService(id);
    if (imagePath && result) {
      removeImage(imagePath);
    } else return console.log("Deleted image failed!");
    res.status(200).json({ mess: "Deleted product successful!", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mess: "Error deleted products!" });
  }
};
