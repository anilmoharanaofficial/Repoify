import AppError from "../utils/AppError.js";
import JWT from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      const intendedUrl = encodeURIComponent(req.originalUrl);
      console.log("Redirect URL:", intendedUrl);
      return res.status(401).json({
        success: false,
        message: "Unauthenticated, Please Login",
        redirect: `/login?redirect=${intendedUrl}`,
      });
    }

    // Verify the token
    const userDetails = await JWT.verify(token, process.env.JWT_SECRET);

    if (!userDetails)
      return next(new AppError("Invalid token, please log in again", 401));

    req.user = userDetails;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authentication failed. Please log in again.",
      error: error.message,
    });
  }
};

export { isLoggedIn };
