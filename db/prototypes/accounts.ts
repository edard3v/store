import bcrypt from "bcrypt";
import { BCRYPT } from "src/bcrypt/const";
import { ROLES } from "./roles";

export const ACCOUNTS = [
  {
    id: crypto.randomUUID(),
    email: "edar@gmail.com",
    password: bcrypt.hashSync("123456", BCRYPT.salt),
    role: ROLES[0].id,
  },
  {
    id: crypto.randomUUID(),
    email: "lore@gmail.com",
    password: bcrypt.hashSync("123456", BCRYPT.salt),
    role: ROLES[1].id,
  },
];
