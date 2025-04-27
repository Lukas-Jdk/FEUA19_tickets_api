import { v4 as uuidv4 } from "uuid";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const REGISTER_USER = async (req, res) => {
  try {
  const { name, email, password } = req.body;
  const id = uuidv4();

  // 1.patikrinu ar visi laukai yra.
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const salt = bcryptjs.genSaltSync(10);
  const passwordHash = bcryptjs.hashSync(password, salt);

  const newUser = new User({
    id,
    name,
    email,
    password: passwordHash,
    bought_tickets: [],
    money_balance: 100,
  });

  await newUser.save();

  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  const refreshToken = jwt.sign({ id: newUser.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "1d",
  });

res.status(200).json({
  message: "Your registration was succesfully",
  token,
  refreshToken,
});
} catch (error){
  console.error(error);
  res.status(500).json({message: "Server Error !"})
}
};






export {
  REGISTER_USER,
}