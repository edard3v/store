import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { loginAccount } from "./loginAccount.service";

export const login = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
  async handler(form) {
    return await loginAccount(form);
  },
});
