import { JarModel } from "../models/JarModel.js";
import { CookieModel } from "../models/CookieModel.js";
import cloudinary from "../utils/cloudinary.js";
import { UserModel } from "../models/UserModel.js";

export const getJars = (req, res) => {
  const author = req.user._id;
  try {
    UserModel.findById(author)
      .populate("jars")
      .exec((err, result) => {
        if (err) res.status(400).json({ redirectURL: "/login" });
        res.status(200).json({ jars: result.jars });
      });
  } catch (error) {
    res.status(500).json({ Error: "Internal server error" });
    console.log(error);
  }
};

export const createJar = async (req, res) => {
  const newJar = req.body.jarName;
  const author = req.user._id;
  try {
    const jar = new JarModel({ jarName: newJar, author: author });
    await UserModel.findById(author, (err, result) => {
      if (err) res.status(400).json({ redirectURL: "/login" });
      result.jars.push(jar);
      result.save();
    }).clone();
    await jar.save();
    res.status(200).send(jar);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getJarData = async (req, res) => {
  const id = req.params.id;
  try {
    await JarModel.findById(id)
      .populate("cookies")
      .exec((err, result) => {
        if (err) res.status(400).json({ error: err });
        res.status(200).json({ jar: result });
      });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteJar = async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  try {
    await JarModel.findById(id, (err, result) => {
      if (err) return console.log(err);
      const cookieArray = result.cookies;
      for (let i = 0; i < cookieArray.length; i++) {
        CookieModel.findByIdAndRemove(cookieArray[i], (err, result) => {
          if (err) res.status(400).json({ Error: err });
          cloudinary.v2.uploader.destroy(
            result.cookieImage_id,
            (err, result) => {
              if (err) return console.log(err);
              return;
            }
          );
        });
      }
    }).clone();

    await UserModel.findById(user._id, (err, result) => {
      if (err) res.status(400).json({ Error: err });
      result.jars.remove(id);
      result.save();
    }).clone();

    await JarModel.findByIdAndRemove(id, (err, result) => {
      if (err) return console.log(err);
      return;
    }).clone();

    res.status(200).send("jar deleted");
  } catch (error) {
    console.log(error);
  }
};

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

export const createCookie = async (req, res) => {
  const newCookieTitle = req.body.cookieTitle;
  const newCookieContent = req.body.cookieContent;
  const id = req.params.id;
  const file = req.file.path;

  try {
    const imageUploadResult = await cloudinary.v2.uploader.upload(
      file,
      {
        transformation: [
          {
            dpr: "auto",
            responsive: true,
            width: 300,
            crop: "scale",
          },
          { quality: "auto", fetch_format: "auto" },
        ],
      },
      (err, result) => {
        if (err) res.status(500).json("Internal Server Error");
        return;
      }
    );

    const cookie = await CookieModel.create({
      cookieTitle: newCookieTitle,
      cookieContent: newCookieContent,
      cookieImage: imageUploadResult.secure_url,
      cookieImage_id: imageUploadResult.public_id,
      jarID: id,
      read: false,
    });

    await JarModel.findById(id, (err, result) => {
      if (err) res.status(400).json({ Error: error });
      result.cookies.push(cookie);
      result.save();
    }).clone();

    res.status(200).send(cookie);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

export const updateCookieToRead = async (req, res) => {
  const cookieID = req.body.id;
  const cookieUpdate = req.body.read;
  try {
    await CookieModel.findById(cookieID, (err, result) => {
      if (err) return console.log(err);
      result.read = cookieUpdate;
      result.save();
      res.status(200);
    }).clone();
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

export const deleteCookie = async (req, res) => {
  try {
    const cookieID = req.params.id;
    const cookie = await CookieModel.findById(cookieID, (err, cookie) => {
      if (err) return console.log(err);
      return cookie.jarID;
    }).clone();

    await JarModel.findById(cookie.jarID, (err, jar) => {
      if (err) return console.log(err);
      jar.cookies.remove(cookie);
      jar.save();
    }).clone();

    await CookieModel.findByIdAndRemove(cookieID, (err, result) => {
      if (err) return console.log(err);
      return;
    }).clone();

    await cloudinary.v2.uploader.destroy(
      cookie.cookieImage_id,
      (err, result) => {
        if (err) return console.log(err);
        return;
      }
    );

    res.status(200).send(cookie);
  } catch (error) {
    console.log(error);
  }
};
