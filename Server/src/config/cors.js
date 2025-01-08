import cors from "cors";

/***************************  CORS CONFIGURATION  ***************************/
const configureCors = () => {
  const corsOptions = {
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Content-Disposition"],
  };

  return cors(corsOptions);
};

export default configureCors;
