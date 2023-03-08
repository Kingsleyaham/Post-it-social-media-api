import { model, Schema, Types } from "mongoose";

const postSchema = new Schema(
  {
    body: {
      type: String,
      required: [true, "post is required"],
      lowercase: true,
      trim: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },

    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

export default Post;
