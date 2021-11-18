import { UserModel } from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await UserModel.create({ username, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "strict",
    });
    res.status(201).json({ user: user._id, token });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ Errors: errors });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "strict",
    });
    res.status(200).json({ user: user._id, token });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ Errors: errors });
  }
};

export const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1, sameSite: "strict" });
  res.status(200).json({ redirectURL: "/login" });
};

export const forgotPassword = async (req, res, next) => {};

export const resetPassword = async (req, res, next) => {};

const handleErrors = (err) => {
  let errors = { username: "", email: "", password: "" };

  //incorrect email login
  if (err.message === "Incorrect email") {
    errors.email = "Email is not registered";
  }

  //incorrect password login
  if (err.message === "Incorrect password") {
    errors.password = "Wrong password. Please try again.";
  }
  //duplicate error code register
  if (err.code === 11000) {
    errors.email = "Email already used. Please use another email address";
    return errors;
  }
  //validation errors register
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};
