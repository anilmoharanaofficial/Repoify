import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import { cookieOptions, validateEmail } from "../helper/helper.js";
import User from "../models/userModel.js";
import generateUserName from "../utils/generateUserName.js";
import ApiResponse from "../utils/apiResponse.js";
import bcrypt from "bcrypt";

/***************************  SIGNUP  ***************************/
const signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return next(new AppError("All fields are required", 400));

  if (!validateEmail(email))
    return next(new AppError("Please enter a valid email address", 400));

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return next(new AppError("User already exists. Please log in.", 400));

  const user = await User.create({
    name,
    email,
    username: generateUserName(name),
    password,
  });

  if (!user)
    return next(new AppError("Oops! Something went wrong, Please try again"));

  await user.save();
  user.password = undefined;

  ApiResponse.success(res, "User Signing up successfully", user);
});

/***************************  LOGIN  ***************************/
const login = catchAsync(async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email && !username) {
    return next(new AppError("Either email or username is required", 400));
  }

  if (!password) {
    return next(new AppError("Password is required", 400));
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  }).select("+password");

  console.log(user);

  if (!user) {
    return next(new AppError("Invalid credentials", 401));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(new AppError("Invalid credentials", 401));
  }

  // Set Cookies
  const token = await user.generateJWTToken();
  user.password = undefined;
  res.cookie("token", token, cookieOptions);

  ApiResponse.success(res, "User logged in successfully", user);
});

/***************************  LOGOUT  ***************************/
const logout = catchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  ApiResponse.success(res, "User Logged Out Successfully");
});

/***************************  CHNAGE PASSWORD  ***************************/
const changePassword = catchAsync(async (req, res, next) => {
  const userID = req.user.id;
  const { password, newPassword } = req.body;

  const user = await User.findById(userID).select("+password");
  if (!user) return next(new AppError("Invalid credentials", 500));

  if (!password || !newPassword)
    return next(new AppError("All Feilds Are Required", 500));

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return next(new AppError("Invalid Old Password", 400));

  user.password = newPassword;
  await user.save();
  user.password = undefined;

  ApiResponse.success(res, "Password Chnaged Successfully");
});

export { signup, login, logout, changePassword };
