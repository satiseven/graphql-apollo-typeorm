import nodemailer from "nodemailer";
import { SendMailOptions } from "nodemailer";

export const SendMail = async (mailOption: SendMailOptions) => {
  console.log("this is mailllll");
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  let info = await transporter.sendMail({
    from: mailOption.from,
    to: mailOption.to,
    subject: mailOption.subject,
    text: mailOption.text,
    html: mailOption.html,
  });

  //console.log("Message sent: %s", info.messageId);

  //  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
