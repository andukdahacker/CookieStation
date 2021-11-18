import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  //   check jwt exists
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.json({ redirectURL: "/login" });
        console.log(err);
      } else {
        const user = await UserModel.findById(decodedToken.id);
        if (!user) next();
        req.user = user;
        next();
      }
    });
  } else {
    res.json({ redirectURL: "/login" });
  }
};

export const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        next();
      } else {
        console.log(decodedToken);
        let user = await UserModel.findById(decodedToken.id);
        req.user = user;
        next();
      }
    });
  } else {
    next();
  }
};
