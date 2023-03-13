import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import router from "./routes/";
import dotenv from "dotenv";
import database from "./database/db.connection";
import { appConfig, dbConfig } from "./config";

const app = express();
dotenv.config();

// third part middlewares
app.use(bodyParser.json());
app.use(helmet());

// router
app.use("/api/v1", router);

app.get("/*", (req: Request, res: Response) => {
  res.send(
    `kindly visit <a href='${appConfig.DOC_URL}'>${appConfig.DOC_URL}<a/> to view api documentation`
  );
});

// starting up server
app.listen(appConfig.PORT, () => {
  console.log(`server running on http://${appConfig.HOST}:${appConfig.PORT}`);
  database();
});
