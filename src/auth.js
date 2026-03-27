import jwt from "jsonwebtoken";

const defaultSecret = "dev_secret_change_me";

export function getJwtSecret() {
  return process.env.JWT_SECRET?.trim() || defaultSecret;
}

export function signAccessToken({ userId }) {
  const secret = getJwtSecret();
  return jwt.sign({ sub: userId }, secret, { expiresIn: "30m" });
}

export function verifyAccessToken(token) {
  const secret = getJwtSecret();
  return jwt.verify(token, secret);
}

