import { Document, ObjectIdSchemaDefinition, Types } from "mongoose";

export interface IComment extends Document {
  _id: Types.ObjectId;
  content: string;
  post: ObjectIdSchemaDefinition;
  user: ObjectIdSchemaDefinition;
  isDeleted: boolean;
  deletedAt: Date | null;
}
