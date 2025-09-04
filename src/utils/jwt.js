import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = user => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const authToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send({ status: "error", message: "No token" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send({ status: "error", message: "Invalid token" });
    req.user = decoded;
    next();
  });
};