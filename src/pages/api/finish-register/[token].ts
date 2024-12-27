import type { APIRoute } from "astro";
import { verifyToken } from "src/jwt/verifyToken";
import { finishRegisterService } from "./_finishRegister.service";
import { Res } from "../res/_res";
import { EdarErr } from "src/errors/EdarErr";

export const GET: APIRoute = async ({ params }) => {
  const { token } = params as { token: string };

  try {
    const decoded = verifyToken(token) as any;
    const email = decoded?.email;
    const password = decoded?.password;

    if (!email || !password) throw new EdarErr(404, "Token invalido");

    await finishRegisterService({ email, password });

    return Res.json(201, "Ya puede iniciar sesión sin problemas.");
  } catch (error: any) {
    return Res.json(error?.status, error?.msg ?? error.message);
  }
};
