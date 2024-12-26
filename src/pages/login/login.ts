import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { DOM } from "src/dom/dom";
import { ROUTER } from "../router";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

document.addEventListener("astro:page-load", () => {
  const form = DOM.select("login-form") as HTMLFormElement;

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const { error } = await actions.login(formData);

    if (!error) return navigate(ROUTER.account.href);

    Swal.fire({
      text: error.message,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  });
});
