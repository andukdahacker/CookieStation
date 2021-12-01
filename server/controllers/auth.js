import { UserModel } from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/sendMail.js";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await UserModel.create({ username, email, password });
    const accessToken = createToken(user._id);

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "strict",
    });

    // const refreshToken = jwt.sign(user._id, process.env.REFRESH_ACCESS_TOKEN, {
    //   expiresIn: "1y",
    // });
    // res.cookie("refresh-jwt", refreshToken, {
    //   httpOnly: true,
    //   maxAge: maxAge * 12 * 365 * 1000,
    //   sameSite: "strict",
    // });
    res.status(201).json({ user: user.username, accessToken });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ Errors: errors });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const accessToken = createToken(user._id);
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "strict",
    });

    res.status(200).json({ user: user.username, accessToken });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ Errors: errors });
  }
};

export const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1, sameSite: "strict" });
  res.status(200).json({ redirectURL: "/login" });
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) res.status(404).json({ Error: "User does not exist" });
    const resetToken = UserModel.getResetPasswordToken();
    await user.save();
    console.log(user);
    console.log(resetToken);
    const resetURL = `http://localhost:3000/resetpassword/${resetToken}`;
    console.log(resetURL);

    const message = `
    <h1>You have requested a password reset</h1>
    <p>Click the link below to continue the process</p>
    <a href=${resetURL} clicktracking=off>${resetURL}</a>
    `;

    try {
      sendMail({
        to: user.email,
        subject: "Password Reset",
        text: message,
      });

      res.status(200).json({ data: "Email sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      console.log(error);

      res.status(500).json({ Error: error });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: error });
  }
};

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

const maxAge = 2 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};
