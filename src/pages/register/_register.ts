import { actions } from "astro:actions";
import { DOM } from "src/dom/dom";
import { ROUTER } from "../_router";
import { navigate } from "astro:transitions/client";
import Swal from "sweetalert2";

document.addEventListener("astro:page-load", () => {
  const form = DOM.select("register-form") as HTMLFormElement;
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const { error, data } = await actions.register(formData);

    if (!error)
      return Swal.fire({
        text: data?.msg,
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(ROUTER.login.href);
        }
      });

    Swal.fire({
      text: error.message,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  });
});
