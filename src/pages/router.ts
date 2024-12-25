export const ROUTER = {
  home: {
    href: "/home/",
    display: "Inicio",
  },
  contact: {
    href: "/contact/",
    display: "Cotacto",
  },
  login: {
    href: "/login/",
    display: "Login",
  },
  register: {
    href: "/register/",
    display: "Registro",
  },
};

export const PAGES = Object.entries(ROUTER).map(([_, value]) => value);
