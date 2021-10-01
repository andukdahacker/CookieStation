import { CookieModel } from "../models/CookieModel.js";

// export const getCookies = async (req, res) => {
//   CookieModel.find({}, (err, result) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//     res.send(result);
//   });
// };

// export const createCookie = async (req, res) => {
//   try {
//     const newCookieTitle = req.body.cookieTitle;
//     const newCookieContent = req.body.cookieContent;
//     const cookie = new CookieModel({
//       cookieTitle: newCookieTitle,
//       cookieContent: newCookieContent,
//     });
//     await cookie.save();
//     res.status(200).json(cookie);
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// };

export const getCookieData = async (req, res) => {
  const id = req.params.id;
  CookieModel.findById(id, (error, result) => {
    if (error) {
      console.log("Error:", error);
      res.status(500);
    }
    res.send(result);
  });
};
