import { createTransport } from "nodemailer";
import { validateField } from "../../../../services/form/validateField";

const transporter = createTransport({
  host: process.env.MAILER_HOST,
  port: Number(process.env.MAILER_PORT),
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

export const POST = async (request: Request) => {
  const { name, email, subject, content } = await request.json();
  let hasErrors = false;
  const errors = {
    name: false,
    email: false,
    subject: false,
    content: false,
  };

  if (!validateField("text", name)) {
    errors.name = true;
    hasErrors = true;
  }
  if (!validateField("text", subject)) {
    errors.subject = true;
    hasErrors = true;
  }
  if (!validateField("text", content)) {
    errors.content = true;
    hasErrors = true;
  }
  if (!validateField("email", email)) {
    errors.email = true;
    hasErrors = true;
  }

  if (hasErrors) {
    return Response.json({ errors });
  }

  const plainTextMessage = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${content}`;
  const htmlMessage = `<p>Name: ${name}</p><p>Email: ${email}</p><p>Subject: ${subject}</p><p>${content}</p>`;
  const sendObject = {
    from: `"Gasp Movie Review" <${process.env.MAILER_USER}>`, // sender address
    to: process.env.MAILER_RECEIVER, // list of receivers
    subject: `Message from ${name} about ${subject}`, // Subject line
    text: plainTextMessage,
    html: htmlMessage,
  };

  const response = await transporter.sendMail(sendObject);

  return Response.json({ status: 200, success: true, data: response });
};
