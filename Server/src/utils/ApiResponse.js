class ApiResponse {
  static success(res, message = "Success", data = null) {
    const response = {
      success: true,
      message,
    };

    if (data !== null) response.data = data;

    return res.status(200).json(response);
  }

  static error(
    res,
    message = "An error occurred",
    statusCode = 500,
    errors = null
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }
}

export default ApiResponse;
