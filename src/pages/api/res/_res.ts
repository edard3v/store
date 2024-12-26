export class Res {
  static json(status?: number, msg?: string) {
    return new Response(
      JSON.stringify({
        msg: msg ?? "Algo va mal",
      }),
      {
        status: status ?? 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
