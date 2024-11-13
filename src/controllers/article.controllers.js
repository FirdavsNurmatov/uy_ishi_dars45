import { Article } from "../modules/index.js";
import { ApiError, statusCodes } from "../utils/index.js";

export const getAllArticles = async function (req, res, next) {
  try {
    const allData = await Article.find();

    res.send(allData);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getArticleById = async function (req, res, next) {
  try {
    const articleId = req.params.id;
    const oneArticleData = await Article.findById(articleId);

    if (oneArticleData) return res.send(oneArticleData);

    res.status(statusCodes.NOT_FOUND).send("Not found!");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const createArticle = async function (req, res, next) {
  try {
    const newArticle = new Article({
      content: req.body?.content,
      author_id: req.body?.author_id,
      category_id: req.body?.category_id,
      course_id: req.body?.course_id
    });

    await newArticle.save();
    res.send("Created");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateArticleById = async function (req, res, next) {
  try {
    const articleId = req.params.id;
    const { content, author_id, category_id, course_id } = req.body;

    const result = await Article.findById(articleId);

    if (!result) return res.status(statusCodes.NOT_FOUND).send("Not found!");

    const updatedData = new Article({
      content: content || result.content,
      author_id: author_id || result.author_id,
      category_id: category_id || result.category_id,
      course_id: course_id || result.course_id
    });

    await updatedData.save();

    res.send("Updated");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteArticleById = async function (req, res, next) {
  try {
    const articleId = req.params.id;

    await Article.findByIdAndDelete(articleId);

    res.send("Deleted");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};
