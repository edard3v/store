import { actions } from "astro:actions";
import { DOM } from "src/dom/dom";
import { ROUTER } from "../router";
import { navigate } from "astro:transitions/client";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

document.addEventListener("astro:page-load", () => {
  const form = DOM.select("register-form") as HTMLFormElement;
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const { error } = await actions.register(formData);

    if (!error) return navigate(ROUTER.login.href);

    Swal.fire({
      text: error.message,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  });
});
