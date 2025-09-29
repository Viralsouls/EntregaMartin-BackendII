import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export const sendResetEmail = async ({ to, token }) => {
  const resetUrl = `${process.env.APP_URL}/api/auth/reset/${token}`;
  const html = `
    <h2>Recuperar contraseña</h2>
    <p>Hacé click en el botón para restablecer tu contraseña. El enlace expira en 1 hora.</p>
    <p><a href="${resetUrl}" style="background:#2f6bed;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;">Restablecer contraseña</a></p>
  `;
  await transporter.sendMail({
    from: process.env.MAIL_FROM || `"Ecommerce" <no-reply@ecommerce.test>`,
    to,
    subject: "Restablecer contraseña",
    html,
  });
};