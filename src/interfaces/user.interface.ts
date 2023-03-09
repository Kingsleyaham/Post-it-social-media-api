import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatarUrl: string;
  isDeleted: boolean;
  deletedAt: null | Date;
  _doc: any;
}
