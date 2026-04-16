import { config } from "../config/config.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export async function verifyUser(req, res, next) {
  const token = res.cookies.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
