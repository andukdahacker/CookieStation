import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  //   check jwt exists
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.json({ redirectURL: "/login" });
        req.user = null;
        console.log(err);
      } else {
        const user = await UserModel.findById(decodedToken.id);
        if (!user) {
          res.json({ redirectURL: "/login" });
          req.user = null;
        } else {
          req.user = user;
          next();
        }
      }
    });
  } else {
    res.json({ redirectURL: "/login" });
  }
};

export const checkAuthor = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    req.user = null;
    next();
  } else {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.json({ Error: err });
      } else {
        const user = await UserModel.findById(decodedToken.id);
        if (!user) {
          res.json({ redirectURL: "/login" });
        } else {
          req.user = user;
          next();
        }
      }
    });
  }
};
