import { verifyAccessToken } from "../auth.js";
import { findUserById } from "../store.js";

export function authRequired(req, res, next) {
  const header = req.header("authorization");
  if (!header || !header.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const token = header.slice("bearer ".length).trim();
  try {
    const payload = verifyAccessToken(token);
    const userId = payload?.sub;
    const user = typeof userId === "string" ? findUserById(userId) : null;
    if (!user) return res.status(401).json({ error: "unauthorized" });
    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ error: "unauthorized" });
  }
}

