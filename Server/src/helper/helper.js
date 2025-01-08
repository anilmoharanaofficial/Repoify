/***************************  COOKIE OPTIONS  ***************************/
const isProduction =
  process.env.NODE_ENV === "production" && process.env.USE_HTTPS === "true";
const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: isProduction,
};

/***************************  VALIDATE EMAIL  ***************************/
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export { cookieOptions, validateEmail };
