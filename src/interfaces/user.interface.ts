import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  avatarUrl: string;
  isDeleted: boolean;
  deletedAt: null | Date;
  _doc: any;
}
