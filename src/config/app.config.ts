import dotenv from "dotenv";
dotenv.config();

const appConfig: Record<string, any> = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
};

export default appConfig;
