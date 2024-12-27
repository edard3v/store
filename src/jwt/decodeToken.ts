import jwt, { type JwtPayload } from "jsonwebtoken";
import type { TokenDecoded } from "src/actions/auth/login/login.service";

export const decodeToken = (token: string) => {
  const decode = jwt.decode(token) as TokenDecoded;

  return decode;
};
