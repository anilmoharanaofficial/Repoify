import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import Repository from "../models/repoModel.js";
import Issue from "../models/issueModel.js";
import AppError from "../utils/AppError.js";
import ApiResponse from "../utils/apiResponse.js";

/*************************** CREATE REPOSITORY ***************************/
const createRepository = catchAsync(async (req, res, next) => {
  const userID = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return next(new AppError("Invalid User ID!", 400));
  }

  const user = await User.findById(userID);
  if (!user) return next(new AppError("User not found", 404));

  const { repositoryName, description, content, issues, visibility } = req.body;

  if (!repositoryName)
    return next(new AppError("Repository name is required", 400));

  const newRepository = await Repository.create({
    name: repositoryName,
    description,
    visibility,
    owner: user._id,
    content,
    issues,
  });

  if (!newRepository)
    return next(new AppError("Oops! Something went wrong, Please try again"));

  await newRepository.save();

  ApiResponse.success(res, "Repository created!");
});

/*************************** GET ALL REPOSITORIES ***************************/
const getAllRepositories = catchAsync(async (req, res, next) => {
  const repositories = await Repository.find({})
    .populate("owner")
    .populate("issues");
  if (!repositories) return next(new AppError("No repositories found", 404));

  ApiResponse.success(res, "Repositories", repositories);
});

/*************************** FETCH REPOSITORY BY ID ***************************/
const fetchRepositoryById = catchAsync(async (req, res, next) => {
  const { repoID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(repoID)) {
    return next(new AppError("Invalid Repo ID!", 400));
  }

  const repository = await Repository.findById(repoID)
    .populate("owner")
    .populate("issues");

  if (!repository) return next(new AppError("No repository found", 404));

  ApiResponse.success(res, "Repository", repository);
});

/*************************** FETCH REPOSITORY BY NAME ***************************/
const fetchRepositoryByName = catchAsync(async (req, res, next) => {
  const { repoName } = req.body;

  const repository = await Repository.find({ name: repoName })
    .populate("owner")
    .populate("issues");

  if (!repository) return next(new AppError("No repository found", 404));

  ApiResponse.success(res, "Repository", repository);
});

/*************************** FETCH REPOSITORIES FOR CURRENT USER ***************************/
const fetchRepositoriesForCurrentUser = catchAsync(async (req, res, next) => {
  const userID = req.user.id;

  console.log("Authenticated user:", req.user);

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return next(new AppError("Invalid User ID!", 400));
  }

  const repositories = await Repository.find({ owner: userID });
  if (!repositories || repositories.length === 0) {
    return next(new AppError("User Repositories not found!", 404));
  }

  ApiResponse.success(res, "Repositories", repositories);
});

/*************************** UPDATE REPOSITORY BY ID ***************************/
const updateRepositoryById = catchAsync(async (req, res, next) => {});

/*************************** SET REPOSITORY VISIBILITY BY ID ***************************/
const toggleVisibilityById = catchAsync(async (req, res, next) => {
  const { repoID, visibility } = req.body;

  if (!mongoose.Types.ObjectId.isValid(repoID))
    return next(new AppError("Invalid Repo ID!", 400));

  const repository = await Repository.findById(repoID);
  if (!repository) return next(new AppError("Repository not found!", 404));

  repository.visibility = visibility;

  await repository.save();

  ApiResponse.success(
    res,
    "Repository visibility updated successfully!",
    repository
  );
});

/*************************** DELETE REPOSITORY BY ID ***************************/
const deleteRepositoryById = catchAsync(async (req, res, next) => {
  const { repoID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(repoID)) {
    return next(new AppError("Invalid Repo ID!", 400));
  }

  const deleteRepository = await Repository.findByIdAndDelete(repoID);
  if (!deleteRepository)
    return next(new AppError("Repository not found!", 404));

  ApiResponse(res, "Repository deleted successfully!");
});

export {
  createRepository,
  getAllRepositories,
  fetchRepositoriesForCurrentUser,
  fetchRepositoryById,
  fetchRepositoryByName,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
};
