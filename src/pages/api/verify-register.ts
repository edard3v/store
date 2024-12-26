import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  console.log(token);

  return new Response(
    JSON.stringify({
      msg: "¡Registro confirmado con éxito! Ahora puedes acceder a tu cuenta.",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};
