const jwt = require("jsonwebtoken");
const User = require("../models/userdetails");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        console.log("❌ Token missing after split");
        return res.status(401).json({
          status: false,
          message: "Not authorized, token missing",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log("✅ Token verified. User:", req.user.email);
      next();
    } catch (error) {
      console.error("❌ Token verification failed:", error.message);
      return res.status(401).json({
        status: false,
        message: "Not authorized, token invalid",
      });
    }
  } else {
    console.log("❌ Authorization header missing or invalid");
    return res.status(401).json({
      status: false,
      message: "Not authorized, token not found",
    });
  }
};

module.exports = protect;
