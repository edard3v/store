import { ActionError } from "astro:actions";
import { Accounts, db } from "astro:db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BCRYPT } from "src/bcrypt/const";
import { JWT } from "src/jwt/const";
import { sendMailToVerifyRegister } from "./sendMailToVerifyRegister.service";
import type { Auth } from "../types";

export const registerService = async (credencials: Auth) => {
  const [account] = await db.select().from(Accounts);

  if (account.email == credencials.email)
    throw new ActionError({
      code: "BAD_REQUEST",
      message: "Email invalido",
    });

  const passHashed = bcrypt.hashSync(credencials.password, BCRYPT.salt);
  const newRegister: Auth = { email: credencials.email, password: passHashed };
  const opt = { expiresIn: JWT.expiresInToRegister };

  const token = jwt.sign(newRegister, JWT.secret, opt);

  const link = `${import.meta.env.API_BASE_URL}/finish-register/${token}`;
  await sendMailToVerifyRegister(credencials.email, link);

  return {
    msg: "Por favor, revise su bandeja de entrada y confirme el registro antes de iniciar sesión.",
  };
};
