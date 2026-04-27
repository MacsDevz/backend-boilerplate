import express from "express";
import uploads from "../middlewares//upload.js";
import { create } from "../controllers/postController.js";

const router = express.Router();

//create
router.post("/", uploads.array("files", 10), create);

export default router;
