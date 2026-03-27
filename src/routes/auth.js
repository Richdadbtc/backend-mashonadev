import bcrypt from "bcryptjs";
import express from "express";
import { randomUUID } from "crypto";
import { signAccessToken } from "../auth.js";
import { createUser, findUserByEmail, publicUser } from "../store.js";

export const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body ?? {};

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof phone !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({ error: "invalid_request" });
  }

  const existing = findUserByEmail(email);
  if (existing) return res.status(409).json({ error: "email_taken" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser({
    id: randomUUID(),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    passwordHash,
    createdAt: new Date().toISOString(),
  });

  const token = signAccessToken({ userId: user.id });
  return res.status(201).json({ token, user: publicUser(user) });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "invalid_request" });
  }

  const user = findUserByEmail(email);
  if (!user) return res.status(401).json({ error: "invalid_credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "invalid_credentials" });

  const token = signAccessToken({ userId: user.id });
  return res.status(200).json({ token, user: publicUser(user) });
});

authRouter.post("/logout", (req, res) => {
  return res.status(204).end();
});

