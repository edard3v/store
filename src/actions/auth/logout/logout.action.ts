import { defineAction } from "astro:actions";

export const logout = defineAction({
  accept: "json",

  async handler(_, { cookies }) {
    cookies.set("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return { msg: "Se ha finalizado la sesión correctamente." };
  },
});
