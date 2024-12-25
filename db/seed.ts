import { Accounts, db, Roles } from "astro:db";
import { ROLES } from "./prototypes/roles";
import { ACCOUNTS } from "./prototypes/accounts";

// https://astro.build/db/seed
export default async function seed() {
  try {
    await db.insert(Roles).values(ROLES);
    await db.insert(Accounts).values(ACCOUNTS);
  } catch (error) {
    console.log(error);
  }
}
