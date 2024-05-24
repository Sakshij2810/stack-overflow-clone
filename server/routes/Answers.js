import express, { Router } from "express";
import { postAnswer, deleteAnswer } from "../controllers/Answers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.patch("/post/:id", auth, postAnswer);
//sakshi
router.patch("/delete/:id", auth, deleteAnswer);

export default router;
