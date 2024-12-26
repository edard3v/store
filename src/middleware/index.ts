import { defineMiddleware } from "astro:middleware";
import { ROUTER } from "src/pages/router";

export const onRequest = defineMiddleware((context, next) => {
  console.log("middleware");

  const { url, cookies, locals } = context;

  if (url.pathname == ROUTER.account.href) {
    locals.isAuth = !!cookies.get("token")?.value;
  }

  return next();
});
