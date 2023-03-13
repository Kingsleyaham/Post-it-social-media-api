import { isValidObjectId, Types } from "mongoose";
import { ERRORS } from "../constants";
import { throwError } from "./throwError";

/** Parse an id to ObjectId if valid. Return an ObjectId or throw an error if id is invalid */
export const parseId = (id: any) => {
  return isValidObjectId(id)
    ? new Types.ObjectId(id)
    : throwError(ERRORS.INVALID_ID);
};
