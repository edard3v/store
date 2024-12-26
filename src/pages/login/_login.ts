import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { DOM } from "src/dom/dom";
import { ROUTER } from "../_router";
import Swal from "sweetalert2";

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
