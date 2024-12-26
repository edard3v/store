import { ActionError } from "astro:actions";
import { Accounts, db } from "astro:db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BCRYPT } from "src/bcrypt/const";
import { JWT } from "src/jwt/const";
import { sendMailToVerifyRegister } from "./sendMailToVerifyRegister.service";

export const registerService = async (credencials: Credencials) => {
  const [account] = await db.select().from(Accounts);

  if (account.email == credencials.email)
    throw new ActionError({
      code: "BAD_REQUEST",
      message: "Email invalido",
    });

  const passHashed = bcrypt.hashSync(credencials.password, BCRYPT.salt);

  const token = jwt.sign({ email: credencials.email, passHashed }, JWT.secret, {
    expiresIn: JWT.expiresInToRegister,
  });

  const link = `${import.meta.env.API_BASE_URL}/verify-register?token=${token}`;
  await sendMailToVerifyRegister(credencials.email, link);

  return {
    msg: "Le hemos enviado un correo electrónico. Por favor, revisa tu bandeja de entrada y confirme su registro.",
  };
};

type Credencials = { email: string; password: string };
