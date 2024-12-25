import { Accounts, db, eq, Roles } from "astro:db";
import bcrypt from "bcrypt";
import { BCRYPT } from "src/bcrypt/const";

export const registerAccount = async (credencials: Credencials) => {
  const { email, password } = credencials;

  const [role] = await db.select().from(Roles).where(eq(Roles.name, "CLIENT"));

  const { rowsAffected } = await db.insert(Accounts).values({
    id: crypto.randomUUID(),
    email,
    password: bcrypt.hashSync(password, BCRYPT.salt),
    role: role.id,
  });

  return rowsAffected;
};

type Credencials = { email: string; password: string };
