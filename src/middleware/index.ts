import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((_, next) => {
  console.log("middleware");

  return next();
});
