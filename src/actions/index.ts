import { register } from "./auth/register/register.action";
import { login } from "./auth/login/login.action";
import { logout } from "./auth/logout/logout.action";

export const server = {
  register,
  login,
  logout,
};
