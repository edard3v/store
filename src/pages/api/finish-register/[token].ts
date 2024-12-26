import type { APIRoute } from "astro";
import { verifyToken } from "src/jwt/verifyToken";
import { finishRegisterService } from "./_finishRegister.service";
import type { Auth } from "src/actions/auth/types";
import { Res } from "../res/_res";

export const GET: APIRoute = async ({ params }) => {
  const { token } = params as { token: string };

  try {
    const credencials = (await verifyToken(token)) as Auth;

    await finishRegisterService(credencials);

    return Res.json(201, "Ya puede iniciar sesión sin problemas.");
  } catch (error: any) {
    return Res.json(error?.status, error?.msg);
  }
};
