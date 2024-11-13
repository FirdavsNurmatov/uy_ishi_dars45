import { Course } from "../modules/index.js";
import { ApiError, statusCodes } from "../utils/index.js";

export const getAllCourses = async function (req, res, next) {
  try {
    const allData = await Course.find();

    res.send(allData);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getCourseById = async function (req, res, next) {
  try {
    const courseId = req.params.id;
    const oneCourseData = await Course.findById(courseId);

    if (oneCourseData) return res.send(oneCourseData);

    res.status(statusCodes.NOT_FOUND).send("Not found!");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const createCourse = async function (req, res, next) {
  try {
    const newCourse = new Course({
      name: req.body?.name,
      category_id: req.body?.category_id,
      description: req.body?.description,
    });

    await newCourse.save();
    res.send("Created");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateCourseById = async function (req, res, next) {
  try {
    const courseId = req.params.id;
    const { name, category_id, description } = req.body;

    const result = await Course.findById(courseId);

    if (!result) return res.status(statusCodes.NOT_FOUND).send("Not found!");

    const updatedData = new Course({
      name: name || result.name,
      category_id: category_id || result.category_id,
      description: description || result.description,
    });

    await updatedData.save();

    res.send("Updated");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteCourseById = async function (req, res, next) {
  try {
    const courseId = req.params.id;

    await Course.findByIdAndDelete(courseId);

    res.send("Deleted");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};
