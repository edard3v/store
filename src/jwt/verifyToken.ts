import { EdarErr } from "src/errors/EdarErr";
import jwt from "jsonwebtoken";
import { JWT } from "src/jwt/const";

export const verifyToken = (token: string) => {
  if (!token) throw new EdarErr(404, "Unauthorized");

  return jwt.verify(token, JWT.secret);
};
