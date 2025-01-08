import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      trim: true,
      minlength: [5, "Name must be at least 5 charchter"],
      maxlength: [50, "Name should be less that 50 charchter"],
      lowercase: true,
    },
    username: {
      type: String,
      required: [true, "Username is Required"],
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      minlength: [8, "Password must be at least 8 charchter"],
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "SUPER_ADMIN"],
      default: "USER",
    },
    repositories: [
      {
        default: [],
        type: Schema.Types.ObjectId,
        ref: "Repository",
      },
    ],
    followedUsers: [
      {
        default: [],
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    starRepos: [
      {
        default: [],
        type: Schema.Types.ObjectId,
        ref: "Repository",
      },
    ],
  },
  {
    timestamps: true,
  }
);

/***************************  PASSWORD ENCRYPTION  ***************************/
UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    return next(new AppError(error, 400));
  }
});

/***************************  GENERATE COOKIE  ***************************/
UserSchema.methods = {
  // Generate JWT Token
  generateJWTToken: async function () {
    return JWT.sign(
      {
        id: this._id,
        username: this.username,
        email: this.email,
        role: this.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  },
};

const User = model("User", UserSchema);

export default User;
