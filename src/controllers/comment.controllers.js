import { Comment } from "../modules/index.js";
import { ApiError, statusCodes } from "../utils/index.js";

export const getAllComments = async function (req, res, next) {
  try {
    const allData = await Comment.find();

    res.send(allData);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getCommentById = async function (req, res, next) {
  try {
    const commentId = req.params.id;
    const oneCommentData = await Comment.findById(commentId);

    if (oneCommentData) return res.send(oneCommentData);

    res.status(statusCodes.NOT_FOUND).send("Not found!");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const createComment = async function (req, res, next) {
  try {
    const newComment = new Comment({
      content: req.body?.content,
      article_id: req.body?.article_id,
      user_id: req.body?.user_id,
      course_id: req.body?.course_id,
    });

    await newComment.save();
    res.send("Created");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateCommentById = async function (req, res, next) {
  try {
    const commentId = req.params.id;
    const { content, article_id, user_id, course_id } = req.body;

    const result = await Comment.findById(commentId);

    if (!result) return res.status(statusCodes.NOT_FOUND).send("Not found!");

    const updatedData = new Comment({
      content: content || result.content,
      article_id: article_id || result.article_id,
      user_id: user_id || result.user_id,
      course_id: course_id || result.course_id,
    });

    await updatedData.save();

    res.send("Updated");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteCommentById = async function (req, res, next) {
  try {
    const commentId = req.params.id;

    await Comment.findByIdAndDelete(commentId);

    res.send("Deleted");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};
