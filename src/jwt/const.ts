export const JWT = {
  secret: import.meta.env.SECRET_JWT,
  expiresIn: "1w",
  expiresInToRegister: "30m",
};

//  1s segundos
//  1m minutos
//  1h horas
//  1d días
//  1w semanas
//  1M meses
//  1y años