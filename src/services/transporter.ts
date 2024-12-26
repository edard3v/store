import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: import.meta.env.NODEMAILER_GMAIL,
    pass: import.meta.env.NODEMAILER_GMAIL_APP_PASSWORD,
  },
});
