import { ActionError } from "astro:actions";
import { Accounts, and, db, eq, Roles } from "astro:db";
import bcrypt from "bcrypt";
import { JWT } from "src/jwt/const";
import jwt from "jsonwebtoken";
import type { Auth } from "../types";

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

  const token = jwt.sign(
    {
      id: account.id,
      email: account.email,
      role: account.role,
    },
    JWT.secret,
    { expiresIn: JWT.expiresIn }
  );

  return { token };
};
