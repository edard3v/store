import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { loginService } from "./login.service";

export const login = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
  async handler(form, { cookies }) {
    const { token } = await loginService(form);

    // Guardar el token en una cookie segura
    cookies.set("token", token, {
      httpOnly: true, // Impide el acceso a la cookie desde JavaScript
      secure: true, // Solo se envía por conexiones HTTPS
      sameSite: "strict", // Previene el envío de cookies en solicitudes entre sitios
      maxAge: 7 * 24 * 60 * 60, // expira en 1 semana
      path: "/", // La cookie estará disponible para todo el dominio
    });

    return { success: true };
  },
});
