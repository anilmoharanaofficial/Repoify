import ApiResponse from "../utils/apiResponse.js";
import catchAsync from "../utils/catchAsync.js";

/***************************  PUSH COMMITS  ***************************/
const pushCommits = catchAsync(async (req, res, next) => {
  ApiResponse.success(res, "Commits pushed successfully");
});

export { pushCommits };
