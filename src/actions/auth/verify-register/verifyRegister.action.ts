import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { verifyRegisterService } from "./verifyRegister.service";

export const verifyRegister = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
  async handler(form, { url }) {
    console.log(url);

    return url;

    // try {
    //   const result = await verifyRegisterService(form);

    //   return result;
    // } catch (error) {
    //   console.log(error);
    // }
  },
});
