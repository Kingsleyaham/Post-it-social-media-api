import dotenv from "dotenv";
dotenv.config();

const docUrl =
  process.env.NODE_ENV === "development"
    ? `http://localhost:${process.env.PORT!}/api/v1/docs/`
    : "https://kingsley-postit-api.onrender.com/api/v1/docs";
    
const appConfig = {
  PORT: process.env.PORT! || 5000,
  HOST: process.env.HOST! || "localhost",
  DOC_URL: docUrl,
};

export default appConfig;
