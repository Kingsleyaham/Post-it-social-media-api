import { model, Schema, Types } from "mongoose";

const replySchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "reply is required"],
      lowercase: true,
      trim: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: Types.ObjectId,
      ref: "Comment",
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const Post = model("Reply", replySchema);

export default Post;
