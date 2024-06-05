import nodemailer from "nodemailer";

export const generateVerificationCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gmltn1052@gmail.com",
      pass: "xjxs pafx ryzw pslw",
    },
  });

  const mailOptions = {
    from: "gmltn1052@gmail.com",
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};
