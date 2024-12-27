import jwt, { type JwtPayload } from "jsonwebtoken";

export const isTokenOld = (token: string): boolean => {
  const { iat } = jwt.decode(token) as JwtPayload;

  if (!iat) {
    throw new Error("El token no contiene información de emisión (iat).");
  }

  const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
  const days = 3 * 24 * 60 * 60; // 3 días en segundos

  return currentTime - iat > days;
};
