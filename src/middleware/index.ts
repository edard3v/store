import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  console.log("middle");
  const isAuth = false;
  context.locals.isAuth = isAuth;

  return next();
});
