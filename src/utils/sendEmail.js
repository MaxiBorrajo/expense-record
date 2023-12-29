import { errors } from "./errorDictionary.js";

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(options) {
  const msg = {
    to: options.to,
    from: process.env.EMAIL_FROM,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      new errors.SERVER_ERROR(`Failed to send email: ${error}`);
    });
}

export default sendEmail;
