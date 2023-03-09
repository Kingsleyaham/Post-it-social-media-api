import { model, Schema, Types } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "comment is required"],
      lowercase: true,
      trim: true,
    },
    post: {
      type: Types.ObjectId,
      ref: "Post",
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

const Comment = model("Comment", commentSchema);

export default Comment;
