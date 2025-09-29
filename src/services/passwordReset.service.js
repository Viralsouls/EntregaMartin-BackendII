import crypto from "crypto";
import PasswordReset from "../models/PasswordReset.model.js";
import UsersRepository from "../repositories/users.repository.js";
import { sendResetEmail } from "../config/mailer.js";
import { createHash, isValidPassword } from "../utils/hash.js";

const usersRepo = new UsersRepository();

export const requestPasswordReset = async (email) => {
  const user = await usersRepo.findByEmail(email);
  if (!user) return; // no reveles existencia

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

  await PasswordReset.create({ user: user._id, token, expiresAt, used: false });
  await sendResetEmail({ to: user.email, token });
};

export const validateResetToken = async (token) => {
  const pr = await PasswordReset.findOne({ token, used: false });
  if (!pr) return null;
  if (pr.expiresAt < new Date()) return null;
  return pr;
};

export const consumeReset = async ({ token, newPassword }) => {
  const pr = await validateResetToken(token);
  if (!pr) throw new Error("Token inválido o expirado");
  const user = await usersRepo.findById(pr.user);
  if (!user) throw new Error("Usuario no encontrado");

  // evitar misma contraseña
  const same = await isValidPassword(newPassword, user.password);
  if (same) throw new Error("La nueva contraseña no puede ser igual a la anterior");

  const hashed = await createHash(newPassword);
  await usersRepo.updatePassword(user._id, hashed);

  pr.used = true;
  await pr.save();

  return true;
};