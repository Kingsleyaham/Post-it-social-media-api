import dotenv from "dotenv";
dotenv.config();

const dbConfig: Record<string, string> = {
  DATABASE_URI: process.env.DATABASE_URI!,
};

export default dbConfig;
