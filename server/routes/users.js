import express from "express";

import { login, signup } from "../controllers/auth.js";
import { fetchAllUsers, updateProfile } from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

router.get("/getAllUsers", fetchAllUsers);
router.patch("/update/:id", auth, updateProfile);

export default router;
