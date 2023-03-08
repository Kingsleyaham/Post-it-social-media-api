import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      minLength: [3, "username name must be atleast 3 character got {VALUE}"],
      required: [true, "username is required"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "password must be atleast 8 character"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
      default: null,
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
