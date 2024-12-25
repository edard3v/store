export const ROUTER = {
  home: {
    href: "/home/",
    display: "Inicio",
  },
  login: {
    href: "/login/",
    display: "Login",
  },
  register: {
    href: "/register/",
    display: "Registro",
  },
  account: {
    href: "/account/",
    display: "Cuenta",
  },
};

export const PAGES = Object.entries(ROUTER).map(([_, value]) => value);
