import { Accounts, db, eq, Roles } from "astro:db";
import type { Auth } from "src/actions/auth/types";
import { EdarErr } from "src/errors/EdarErr";

export const finishRegisterService = async (credencials: Auth) => {
  const { email, password } = credencials;

  const [role] = await db.select().from(Roles).where(eq(Roles.name, "CLIENT"));

  const { rowsAffected } = await db.insert(Accounts).values({
    id: crypto.randomUUID(),
    email,
    password,
    role: role.id,
  });

  if (!rowsAffected) throw new EdarErr(404, "Err al finalizar registro.");

  return rowsAffected;
};
