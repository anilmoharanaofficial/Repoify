import { config } from "dotenv";
config();
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import configureCors from "./config/cors.js";
import setupRoutes from "./routes/router.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

/***************************  MIDDLEWARES  ***************************/
app.use(configureCors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.set("trust proxy", 1);
app.use(cookieParser());

/***************************  ROUTES  ***************************/
app.get("/", (req, res) => {
  res.send("Hello");
});

setupRoutes(app);

app.use(errorMiddleware); //Error Middleware

export default app;
