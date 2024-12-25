import { ActionError } from "astro:actions";
import { Accounts, and, db, eq, Roles } from "astro:db";
import bcrypt from "bcrypt";

export const loginAccount = async (credencials: Credencials) => {
  const [user] = await db
    .select()
    .from(Accounts)
    .where(eq(Accounts.email, credencials.email))
    .limit(1);

  if (!user)
    throw new ActionError({ code: "BAD_REQUEST", message: "Login invalido" });

  const isLogged = bcrypt.compareSync(credencials.password, user.password);
  if (!isLogged)
    throw new ActionError({ code: "BAD_REQUEST", message: "Login invalido" });

  return { msg: "token" };
};

type Credencials = { email: string; password: string };
