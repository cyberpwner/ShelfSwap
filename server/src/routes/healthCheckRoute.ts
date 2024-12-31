import sequelize from "../utils/database.js";
import { Router } from "express";

const router = Router();

router.get("/healthcheck", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ status: "OK" });
  } catch (error) {
    let errorMsg = "An unkown error occurred";

    if (error instanceof Error) {
      errorMsg = error.message;
    }

    res.status(500).json({
      status: "Database connection failed",
      error: errorMsg,
    });
  }
});

export default router;
