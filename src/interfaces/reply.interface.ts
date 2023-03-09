import { Document, ObjectIdSchemaDefinition, Types } from "mongoose";

export interface IReply extends Document {
  _id: Types.ObjectId;
  content: string;
  comment: ObjectIdSchemaDefinition;
  user: ObjectIdSchemaDefinition;
  isDeleted: boolean;
  deletedAt: Date | null;
}
