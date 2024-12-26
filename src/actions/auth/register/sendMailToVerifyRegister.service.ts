import { transporter } from "@services/transporter";

export const sendMailToVerifyRegister = async (to: string, link: string) => {
  return await transporter.sendMail({
    from: import.meta.env.NODEMAILER_GMAIL,
    to,
    subject: "Vericar registro",
    html: `<a href=${link} style="color: royalblue">Click aquí para verificar su registro</a>`,
  });
};
