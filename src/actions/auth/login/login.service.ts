import { ActionError } from "astro:actions";
import { Accounts, and, db, eq, Roles } from "astro:db";
import bcrypt from "bcrypt";
import { JWT } from "src/jwt/const";
import jwt from "jsonwebtoken";
import type { Auth } from "../types";
import type { z } from "astro:schema";

export const loginService = async (credencials: Auth) => {
  const [account] = await db
    .select()
    .from(Accounts)
    .where(eq(Accounts.email, credencials.email))
    .limit(1);

  if (!account)
    throw new ActionError({ code: "BAD_REQUEST", message: "Login invalido" });

  const isLogged = bcrypt.compareSync(credencials.password, account.password);
  if (!isLogged)
    throw new ActionError({ code: "BAD_REQUEST", message: "Login invalido" });

  const payload = {
    id: account.id,
    email: account.email,
    role: account.role,
  };

  const token = jwt.sign(payload, JWT.secret, {
    expiresIn: JWT.expiresIn,
  });

  return { token };
};

export type TokenDecoded = {
  id: string;
  email: string;
  role: string;
  exp: number; // Tiempo de expiración
  iat: number; // Tiempo de emisión
};
