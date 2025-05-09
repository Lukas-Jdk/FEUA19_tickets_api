import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./src/routes/user.js";
import ticketRoutes from "./src/routes/ticket.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(ticketRoutes);

const startServer = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB succsesfuly Loged In");

    app.listen(PORT, () => {
      console.log(`Server working on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB log in error", error);
  }
};
startServer();
