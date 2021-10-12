import { JarModel } from "../models/JarModel.js";
import { CookieModel } from "../models/CookieModel.js";
import cloudinary from "../utils/cloudinary.js";

export const getJars = async (req, res) => {
  JarModel.find({}, (err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(result);
  });
};

export const createJar = async (req, res) => {
  try {
    const newJar = req.body.jarName;
    const jar = new JarModel({ jarName: newJar });
    await jar.save();
    res.status(200).send(jar);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getJarData = async (req, res) => {
  const id = req.params.id;
  JarModel.findById(id, (error, result) => {
    if (error) {
      console.log("Error:", error);
      res.status(500);
    }
    res.status(200);
    res.send(result);
  });
};

export const deleteJar = async (req, res) => {
  try {
    const id = req.params.id;

    await JarModel.findByIdAndRemove(id, (err, result) => {
      if (err) return console.log(err);
      return;
    }).clone();

    res.status(200).send("jar deleted");
  } catch (error) {
    console.log(error);
  }
};

export const createCookie = async (req, res) => {
  try {
    const newCookieTitle = req.body.cookieTitle;
    const newCookieContent = req.body.cookieContent;
    const id = req.params.id;
    const file = req.file.path;
    const imageUploadResult = await cloudinary.v2.uploader.upload(file, {
      public_id: `${id}_cookie`,
      width: 200,
    });

    const cookie = new CookieModel({
      cookieTitle: newCookieTitle,
      cookieContent: newCookieContent,
      cookieImage: imageUploadResult.secure_url,
      jarID: id,
      read: false,
    });

    const jar = await JarModel.findById(id).clone();
    jar.cookies.push(cookie);

    await jar.save();
    await cookie.save();
    res.status(200).send(cookie);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

export const updateCookieToRead = async (req, res) => {
  try {
    const cookieID = req.body.id;
    const cookieUpdate = req.body.read;
    const jarID = req.params.id;

    await JarModel.findById(jarID, (err, result) => {
      if (err) return console.log(err);
      result.cookies.id(cookieID).read = cookieUpdate;
      result.save();
    }).clone();

    await CookieModel.findById(cookieID, (err, result) => {
      if (err) return console.log(err);
      result.read = cookieUpdate;
      result.save();
    }).clone();

    res.status(200).send("cookie updated");
  } catch (error) {
    console.log(error);
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

    res.status(200).send(cookie);
  } catch (error) {
    console.log(error);
  }
};
