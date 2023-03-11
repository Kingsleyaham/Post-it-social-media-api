import bcrypt from "bcrypt";
import { IUser } from "./../interfaces/user.interface";
import { model, Schema } from "mongoose";

const userSchema = new Schema<IUser>(
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
    avatarUrl: {
      type: String,
      required: [true, "avartarUrl is required"],
      default: null,
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// hash password before saving to database
userSchema.pre("save", async function (next) {
  const user = this;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (err: any) {
    return next(err);
  }
});

const User = model<IUser>("User", userSchema);

export default User;
