import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./../docs";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

const swaggerOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
};

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDoc, swaggerOptions));

export default router;
