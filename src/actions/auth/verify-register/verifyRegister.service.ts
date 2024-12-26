import { ActionError } from "astro:actions";
import { Accounts, db, eq, Roles } from "astro:db";
import bcrypt from "bcrypt";
import { BCRYPT } from "src/bcrypt/const";

export const verifyRegisterService = async (credencials: Credencials) => {
  const { email, password } = credencials;

  const [role] = await db.select().from(Roles).where(eq(Roles.name, "CLIENT"));

  const { rowsAffected } = await db.insert(Accounts).values({
    id: crypto.randomUUID(),
    email,
    password: bcrypt.hashSync(password, BCRYPT.salt),
    role: role.id,
  });

  if (!rowsAffected)
    throw new ActionError({
      code: "BAD_REQUEST",
      message: "Err al verificar registro",
    });

  return rowsAffected;
};

type Credencials = { email: string; password: string };
