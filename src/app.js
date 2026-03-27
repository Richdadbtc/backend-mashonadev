import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { authRouter } from "./routes/auth.js";
import { profileRouter } from "./routes/profile.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: true,
      credentials: false,
    }),
  );
  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/health", (_req, res) => res.json({ ok: true }));

  app.use("/api/auth", authRouter);
  app.use("/api/profile", profileRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: "not_found" });
  });

  return app;
}

