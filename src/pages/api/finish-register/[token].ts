import type { APIRoute } from "astro";
import { verifyToken } from "src/middleware/verifyToken";
import { finishRegisterService } from "./finishRegister.service";
import type { Auth } from "src/actions/auth/types";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const { token } = params as { token: string };

  try {
    const credencials = (await verifyToken(token)) as Auth;

    await finishRegisterService(credencials);

    return new Response(
      JSON.stringify({
        msg: "¡Registro confirmado con éxito! Ya puede iniciar sesión sin problemas.",
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    throw error;
  }
};
