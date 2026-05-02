const User = require("../models/User");
const {
  validateRegisterData,
  validateLoginData,
} = require("../utils/validation");

const register = async (req, res) => {
  try {
    validateRegisterData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const user = await User.create({
      firstName,
      lastName,
      emailId,
      password,
    });

    await user.save();

    return res.status(201).json({
      message: `Hello ${firstName}, your account has been created successfully`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    validateLoginData(req);
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    return res.status(200).json({
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login, register };
