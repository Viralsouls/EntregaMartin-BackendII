import mongoose from "mongoose";

const PasswordResetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  token: { type: String, required: true, unique: true, index: true },
  expiresAt: { type: Date, required: true, index: true },
  used: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("password_resets", PasswordResetSchema);