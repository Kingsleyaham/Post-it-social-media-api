import dotenv from "dotenv";
dotenv.config();

const jwtConfig = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
};

export default jwtConfig;
