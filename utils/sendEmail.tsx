import nodemailer from "nodemailer";

type emailOptions = {
  subject: string;
  message: string;
  to: string;
  from?: string;
  reply_to?: string;
};

export const sendEmail = async (options: emailOptions) => {
  const { subject, message, to, from, reply_to } = options;
  
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_PORT === "465", // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // For self-signed certificates
    },
  } as any);

  const mailOptions = {
    from: from || process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: to,
    subject: subject,
    html: message,
    replyTo: reply_to,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
