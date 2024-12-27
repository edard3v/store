import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { refreshToken } from "src/jwt/refreshToken";

export const refreshLogin = defineAction({
  accept: "json",
  input: z.string(),
  async handler(token, { cookies }) {
    try {
      const newToken = refreshToken(token);
      cookies.set("token", newToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      return { msg: "Se refrescado la sesión correctamente." };
    } catch (error) {
      cookies.set("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 0,
        path: "/",
      });

      throw error;
    }
  },
});
