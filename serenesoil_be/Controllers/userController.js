import User from "../models/userModal.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // validate existing User
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already Exists" });
    }
    // validate Password Later
    // validating Email Format using regex
    const testEmail = validateEmail(email);
    if (!testEmail) {
      return res
        .status(400)
        .json({ message: "Email Format Error, Email Invalid" });
    }
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    // console.log(hashPassword)
    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    console.log(token);
    res.status(200).json({ message: "User Registered", token: token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "Internal server error in registering User",
        error: error,
      });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // validation is a registerd User?
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "No user found" });
    }

    // password verification
    const passMatch = await bcrypt.compare(password, existingUser.password);
    if (!passMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY
    );
    res.status(200).json({ message: "Login Successfull", token: token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "Internal server error in logging In user",
        error: error,
      });
  }
};

export const getUser = async (req, res) => {
  const { userID } = req.body;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json({ message: "User Data", user: user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error in getting User" });
  }
};

export const loginAdmin = (req, res) => {
  const { username, password } = req.body;
  try {
    const adminUsername = process.env.adminUSERNAME;
    const adminPassword = process.env.adminPASS;
    console.log("env",adminPassword, adminUsername);
    console.log("user",password, username)
    if (username != adminUsername || password != adminPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: username }, process.env.JWT_SECRET_KEY);
    res.status(200).json({ message: "Login Successfull", token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error in logging in admin" });
  }
};
