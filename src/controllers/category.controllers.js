import { Category } from "../modules/category.model.js";
import { ApiError, statusCodes } from "../utils/index.js";

export const getAllCategories = async function (req, res, next) {
  try {
    const allData = await Category.find();

    res.send(allData.rows);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getCategoryById = async function (req, res, next) {
  try {
    const categoryId = req.params.id;
    const oneCategoryData = await Category.findById(categoryId);

    if (oneCategoryData) return res.send(oneCategoryData);

    res.status(statusCodes.NOT_FOUND).send("Not found!");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const createCategoryCon = async function (req, res, next) {
  try {
    const newCategory = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    await newCategory.save();
    res.send("Created");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateCategoryByIdCon = async function (req, res, next) {
  try {
    const categoryId = req.params.id;
    const { name, description } = req.body;

    const result = await Category.findById(categoryId);

    if (!result) return res.status(statusCodes.NOT_FOUND).send("Not found!");

    const updatedData = new Category({
      name: name || currentUser.name,
      description: description || currentUser.description,
    });

    await updatedData.save();

    res.send("Updated");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteByIdCategoryCon = async function (req, res, next) {
  try {
    const categoryId = req.params.id;

    await Category.findByIdAndDelete(categoryId);

    res.send("Deleted");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};
