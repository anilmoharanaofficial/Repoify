import User from "../models/userModel.js";
import ApiResponse from "../utils/apiResponse.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

/*************************** USER PROFILE ***************************/
const getUserProfile = catchAsync(async (req, res, next) => {
  const userID = req.user.id;
  const user = await User.findById(userID);
  if (!user) return next(new AppError("User not found", 404));

  ApiResponse.success(res, "User Data", user);
});

/*************************** UPDATE USER PROFILE ***************************/
const updateUserProfile = catchAsync(async (req, res, next) => {
  const userID = req.user.id;
  const { name, email } = req.body;

  const user = await User.findById(userID);
  if (!user) return next(new AppError("User Not Found", 500));

  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  ApiResponse.success(res, "User Profile Updated Successfully");
});

/*************************** GET ALL USERS ***************************/
const getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find().select("-password");
  ApiResponse.success(res, "All Users Retrieved Successfully", users);
});

/*************************** DELETE ACCOUNT ***************************/
const deleteAccount = catchAsync(async (req, res, next) => {
  const userID = req.user.id;

  const user = await User.findByIdAndDelete(userID);
  if (!user) return next(new AppError("User Not Found", 404));

  ApiResponse.success(res, "Account Deleted Successfully");
});

export { getUserProfile, updateUserProfile, getAllUser, deleteAccount };
