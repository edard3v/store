import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { registerAccount } from "./registerAccount.service";

export const register = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
  async handler(form) {
    try {
      const result = await registerAccount(form);

      return result;
    } catch {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Err de registro",
      });
    }
  },
});
