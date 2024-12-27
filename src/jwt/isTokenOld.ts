import jwt, { type JwtPayload } from "jsonwebtoken";

export const isTokenOld = (token: string): boolean => {
  const payload = jwt.decode(token) as JwtPayload;

  if (!payload?.iat) return true;

  const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
  const days = 3 * 24 * 60 * 60; // 3 días en segundos

  return currentTime - payload.iat > days;
};
