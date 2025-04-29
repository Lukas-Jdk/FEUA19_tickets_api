import Ticket from "../models/ticket.js";
import { v4 as uuidv4 } from "uuid";

const INSERT_TICKET = async (req, res) => {
  try {
    const {
      title,
      ticket_price,
      from_location,
      to_location,
      to_location_photo_url,
    } = req.body;
    if (
      !title ||
      !ticket_price ||
      !from_location ||
      !to_location ||
      !to_location_photo_url
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newTicket = new Ticket({
      id: uuidv4(),
      title,
      ticket_price,
      from_location,
      to_location,
      to_location_photo_url,
    });
    await newTicket.save();

    res.status(200).json({
      message: "Ticket inserted succesfully",
      ticket: newTicket,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export { INSERT_TICKET };
