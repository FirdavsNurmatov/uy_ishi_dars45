import { User } from "../modules/index.js";

export const userController = function (req, res, next) {
  try {
    const currentUser = req.user;

    return res.send(currentUser);
  } catch (error) {
    next(error);
  }
};

export const updateUserByIdController = async function (req, res, next) {
  try {
    const { email, password, name, role } = req.body;
    const currentUser = await User.findById(req.params?.id);

    if (!currentUser) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send(errorMessages.USER_NOT_FOUND);
    }

    const updatedData = new User({
      email: email || currentUser.email,
      password: password || currentUser.password,
      name: name || currentUser.name,
      role: role || currentUser.role,
    });

    await updatedData.save();

    return res.send("Updated");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteUserByIdController = async function (req, res, next) {
  try {
    const currentUser = await User.findByIdAndDelete(req.params?.id);

    if (!currentUser) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send(errorMessages.USER_NOT_FOUND);
    }

    return res.send("Deleted");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};
