import { v4 as uuidv4 } from "uuid";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const REGISTER_USER = async (req, res) => {
  try {
    const { name, email, password } = req.body;
  

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const id = uuidv4();

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
    const refreshToken = jwt.sign({ id: newUser.id },process.env.JWT_REFRESH_SECRET,{
        expiresIn: "1d",
      });

    res.status(200).json({
      message: "Your registration was successfully",
      token,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error !" });
  }
};

const LOGIN_USER = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Bad email or password" });
    }

    const passwordMatch = bcryptjs.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Bad email or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    const refreshToken = jwt.sign({ id: user.id },process.env.JWT_REFRESH_SECRET,{
      expiresIn: "1d",
      });

    res.status(200).json({
      message: "LogIn successfully ",
      token,
      refreshToken,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

export { REGISTER_USER, LOGIN_USER };
