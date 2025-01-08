import catchAsync from "../utils/catchAsync.js";

/*************************** CREATE ISSUE ***************************/
const createIssue = catchAsync(async (req, res, next) => {});

/*************************** UPDATE ISSUE BY ID ***************************/
const updateIssueById = catchAsync(async (req, res, next) => {});

/*************************** DELETE ISSUE BY ID ***************************/
const deleteIssueById = catchAsync(async (req, res, next) => {});

/*************************** GET ALL ISSUES ***************************/
const getAllIssues = catchAsync(async (req, res, next) => {});

/*************************** GET ISSUE BY ID ***************************/
const getIssueById = catchAsync(async (req, res, next) => {});

export {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssues,
  getIssueById,
};
