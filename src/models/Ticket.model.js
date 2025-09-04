import mongoose from "mongoose";

const ticketCollection = "Tickets";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true
  },
  purchase_datetime: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  purchaser: {
    type: String, // email del comprador
    required: true
  }
});

const TicketModel = mongoose.model(ticketCollection, ticketSchema);

export default TicketModel;