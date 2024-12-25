// import GitHub from "@auth/core/providers/github";
import { defineConfig } from "auth-astro";
import Credentials from "@auth/core/providers/credentials";
import { Accounts, db, eq } from "astro:db";
import bcrypt from "bcrypt";

export default defineConfig({
  providers: [
    // GitHub({
    //   clientId: import.meta.env.GITHUB_CLIENT_ID,
    //   clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    // }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      authorize: async ({ email, password }) => {
        const [account] = await db
          .select()
          .from(Accounts)
          .where(eq(Accounts.email, String(email)));

        if (!account) throw new Error("Cuenta no encontrada");
        if (!bcrypt.compareSync(String(password), account.password))
          throw new Error("Contraseña incorrecta");

        const { password: _, ...rest } = account;

        return rest;
      },
    }),
  ],
});
