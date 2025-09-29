import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  purchase_datetime: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true }, // email del usuario
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: Number,
      price: Number
    }
  ],
}, { timestamps: true });

export default mongoose.model("tickets", TicketSchema);