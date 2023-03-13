import mongoose from "mongoose";
import { dbConfig } from "../config";

const databaseConnection = () => {
  mongoose
    .set("strictQuery", true)
    .connect(dbConfig.DATABASE_URI)
    .then(() => console.log("connection to database successful"))
    .catch((err) => console.log(err.message));
};

export default databaseConnection;
