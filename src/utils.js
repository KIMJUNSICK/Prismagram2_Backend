require("dotenv").config();
import { adjetives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const secretGenerator = () => {
  const randomNumber = Math.floor(Math.random() * adjetives.length);
  return `${adjetives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = mail => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const transpoter = nodemailer.createTransport(sgTransport(options));

  return transpoter.sendMail(mail);
};

export const sendSecretMail = (email, loginSecret) => {
  const mail = {
    from: "Prismagram@prismagram.com",
    to: email,
    subject: "🔒Login Secret for Prismagram🔒",
    html: `Hello! Your login secret it ✅<b>${loginSecret}</b>.<br/>Copy paste on the app/website to log in`
  };
  return sendMail(mail);
};
