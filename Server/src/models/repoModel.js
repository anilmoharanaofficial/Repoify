import { model, Schema } from "mongoose";

const RepositorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    content: [
      {
        type: String,
      },
    ],
    visibility: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issues: [
      {
        type: Schema.Types.ObjectId,
        ref: "Issue",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Repository = model("Repository", RepositorySchema);

export default Repository;
