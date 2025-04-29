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
    if (!email.includes("@")) {
      return res.status(400).json({ message: "Email must contain @" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    if (!/\d/.test(password)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one number" });
    }

    const fixedName = name.charAt(0).toUpperCase() + name.slice(1);

    const id = uuidv4();
    const salt = bcryptjs.genSaltSync(10);
    const passwordHash = bcryptjs.hashSync(password, salt);

    const newUser = new User({
      id,
      name: fixedName,
      email,
      password: passwordHash,
      bought_tickets: [],
      money_balance: 100,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    const refreshToken = jwt.sign(
      { id: newUser.id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "1d",
      }
    );

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
      return res.status(401).json({ message: "Bad email or password" });
    }

    const passwordMatch = bcryptjs.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Bad email or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "1d",
      }
    );

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

const GET_NEW_JWT_TOKEN = async (req, res) => {
  try { 
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Please LogIn again" });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: "Invalid or expired refresh token" });
      }

    const newToken = jwt.sign({ 
      id: decoded.id }, 
      process.env.JWT_SECRET, 
      {expiresIn: "2h",}
    );

    res.status(200).json({
      message: "New JWT token generated",
      token: newToken,
      refreshToken: refreshToken,
    });
  });
}catch (error) {
  console.error(error);
  res.status(500).json({message: "Server Error"})
}
};

export { REGISTER_USER, LOGIN_USER, GET_NEW_JWT_TOKEN, };
