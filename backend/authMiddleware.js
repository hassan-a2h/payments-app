const jwt = require("jsonwebtoken");
require("dotenv").config();

function authMiddleware(req, res, next) {
  console.log("authMiddleware, req.cookies:", req?.cookies["Authorization"]);

  if (!req.cookies.Authorization) {
    return res.status(401).send({
      message: "Access denied",
    });
  }

  const token = req.cookies.Authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.error("authMiddleware, error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;
