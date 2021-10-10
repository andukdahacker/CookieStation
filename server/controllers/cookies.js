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
  await CookieModel.findById(id, (error, result) => {
    if (error) {
      console.log("Error:", error);
      res.status(500);
    }
    res.send(result);
  }).clone();
};

// export const updateCookieToRead = async (req, res) => {
//   try {
//     const id = req.body.id;
//     const update = req.body.read;
//     await CookieModel.findByIdAndUpdate(id, { read: update }, (err, result) => {
//       if (err) return console.log("Update error", err);
//       console.log(result);
//     }).clone();
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deleteCookie = async (req, res) => {
//   try {
//     const id = req.params.id;
//     // await CookieModel.findByIdAndRemove(id, (err, result) => {
//     //   if (err) return error;
//     //   done(null, result);
//     //   console.log(result);
//     // }).clone();
//   } catch (error) {
//     console.log(error);
//   }
// };
