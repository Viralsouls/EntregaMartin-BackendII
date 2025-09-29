import TicketModel from "../models/Ticket.model.js";

export default class TicketsRepository {
  create(data) { return TicketModel.create(data); }
  findByPurchaser(email) { return TicketModel.find({ purchaser: email }).sort({ createdAt: -1 }); }
}