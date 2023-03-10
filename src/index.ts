import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import mongoose from "mongoose";
import router from "./routes/";
import dotenv from "dotenv";
import { appConfig, dbConfig } from "./config";
dotenv.config();

const app = express();

// database connection
mongoose
  .set("strictQuery", true)
  .connect(dbConfig.DATABASE_URI)
  .then(() =>
    app.listen(appConfig.PORT, () =>
      console.log(
        `server running on http://${appConfig.HOST}:${appConfig.PORT}`
      )
    )
  )
  .catch((err) => console.log(err.message));

// third part middlewares
app.use(bodyParser.json());
app.use(helmet());

// router
app.use("/api/v1", router);

app.get("/*", (req: Request, res: Response) => {
  res.send("page not found");
});
