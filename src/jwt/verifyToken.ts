import { EdarErr } from "src/errors/EdarErr";
import jwt from "jsonwebtoken";
import { JWT } from "src/jwt/const";

export const verifyToken = async (token: string): Promise<any> => {
  if (!token) throw new EdarErr(404, "Unauthorized");

  const tokenPayload = await new Promise((resolve, reject) => {
    jwt.verify(token, JWT.secret, (err: any, decoded: any) => {
      if (err) return reject(new EdarErr(401, "Unauthorized token"));
      resolve(decoded);
    });
  });

  return tokenPayload;
};
