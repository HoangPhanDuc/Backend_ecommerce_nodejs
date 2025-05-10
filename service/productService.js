import productsModel from "../model/productsModel.js";
import { removeImage } from "../utils/handleFiles.js";

export const addProductService = async (
  name,
  quantity,
  oldPrice,
  newPrice,
  description,
  imageUrl,
  categoryId
) => {
  try {
    const addedProduct = await productsModel.create({
      name: name,
      quantity: quantity,
      old_price: oldPrice,
      new_price: newPrice,
      description: description,
      imageUrl: imageUrl,
      category_id: categoryId,
    });
    return addedProduct;
  } catch (error) {
    throw error;
  }
};

export const getAllProductService = async () => {
  try {
    const getAllProducts = await productsModel.findAll({});
    return getAllProducts;
  } catch (error) {
    throw error;
  }
};

export const updateProductService = async (
  name,
  quantity,
  oldPrice,
  newPrice,
  description,
  imageUrl,
  categoryId,
  id
) => {
  try {
    const newData = {
      name: name,
      quantity: quantity,
      old_price: oldPrice,
      new_price: newPrice,
      description: description,
      category_id: categoryId,
    };
    if (imageUrl) {
      const oldImageUrl = await getImageService(id);
      removeImage(oldImageUrl);
      newData.imageUrl = imageUrl;
    }
    const updatedProduct = await productsModel.update(newData, {
      where: { id: id },
    });
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

//take image path in db to do delete and update image
export const getImageService = async (id) => {
  try {
    const getImageUrl = await productsModel.findByPk(id);
    console.log(getImageUrl, id);
    return getImageUrl.imageUrl;
  } catch (error) {
    throw error;
  }
};

export const deleteProductService = async (id) => {
  try {
    const deleteProduct = await productsModel.destroy({
      where: { id: id },
    });
    return deleteProduct;
  } catch (error) {
    throw error;
  }
};
