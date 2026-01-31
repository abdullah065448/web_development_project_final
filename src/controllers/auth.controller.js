import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (user) =>
  jwt.sign({ userId: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1d",
  });

export const register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = signToken(user);
    res
      .cookie("accessToken", token, { httpOnly: true, sameSite: "lax" })
      .status(201)
      .json({ user: { id: user._id, name: user.name, role: user.role, email: user.email } });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const match = await user.comparePassword(req.body.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });
    const token = signToken(user);
    res
      .cookie("accessToken", token, { httpOnly: true, sameSite: "lax" })
      .json({ user: { id: user._id, name: user.name, role: user.role, email: user.email } });
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res) => {
  res.json({ user: req.user });
};

export const logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.json({ message: "Logged out" });
};
