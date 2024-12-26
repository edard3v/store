import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { registerService } from "./register.service";

export const register = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
  async handler(form) {
    try {
      const result = await registerService(form);

      return result;
    } catch (error) {
      console.log(error);
    }
  },
});
