import { JarModel } from "../models/JarModel.js";
import { CookieModel } from "../models/CookieModel.js";

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
    res.status(200).json(jar);
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
    res.send(result);
  });
};

export const createCookie = async (req, res) => {
  try {
    const newCookieTitle = req.body.cookieTitle;
    const newCookieContent = req.body.cookieContent;
    const id = req.params.id;
    const cookie = new CookieModel({
      cookieTitle: newCookieTitle,
      cookieContent: newCookieContent,
    });
    const jar = await JarModel.findById(id);
    jar.cookies.push(cookie);
    await jar.save();
    await cookie.save();
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};
