import dotenv from "dotenv";
dotenv.config();

const appConfig = {
  PORT: process.env.PORT!,
  HOST: process.env.HOST!,
};

export default appConfig;
