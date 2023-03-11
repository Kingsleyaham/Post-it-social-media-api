import { Document, ObjectIdSchemaDefinition, Types } from "mongoose";

export interface IPost extends Document {
  _id: Types.ObjectId;
  content: string;
  user: ObjectIdSchemaDefinition;
  isDeleted: boolean;
  deletedAt: Date | null;
}
