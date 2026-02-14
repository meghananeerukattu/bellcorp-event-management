const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// SIGNUP
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // checking if all fields are given
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // checking if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });
    res.status(201).json({
      message: "User registered successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      message: "Login successful",
      token
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser,loginUser,};
