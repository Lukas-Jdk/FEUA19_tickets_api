import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true },
  bought_tickets: [{type: String, ref:"Ticket"}],
  money_balance: { type: Number, required: true },
});

export default mongoose.model("User", userSchema)
