import jwt, { type JwtPayload } from "jsonwebtoken";
import { JWT } from "./const";
import { verifyToken } from "./verifyToken";
import type { TokenDecoded } from "src/actions/auth/login/login.service";

export const refreshTokenService = (token: string) => {
  const decoded = verifyToken(token) as TokenDecoded;

  const { iat, exp, ...rest } = decoded;

  const newToken = jwt.sign(rest, JWT.secret as string, {
    expiresIn: JWT.expiresIn,
  });

  return newToken;
};
