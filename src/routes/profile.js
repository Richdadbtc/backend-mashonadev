import express from "express";
import { publicUser } from "../store.js";
import { authRequired } from "../middleware/authRequired.js";

export const profileRouter = express.Router();

profileRouter.get("/", authRequired, (req, res) => {
  return res.status(200).json({ user: publicUser(req.user) });
});

