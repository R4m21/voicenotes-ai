const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userAuth = async (req, res, next) => {
  try {
    const token = req?.cookies?.token || "";
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decodedObj = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedObj || "";
    const user = await User.findById(_id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { userAuth };
