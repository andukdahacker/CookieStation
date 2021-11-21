import { JarModel } from "../models/JarModel.js";
import { CookieModel } from "../models/CookieModel.js";
import cloudinary from "../utils/cloudinary.js";
import { UserModel } from "../models/UserModel.js";

// require auth
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
    res.status(500).json({ Error: error });
  }
};

//require auth
export const createJar = async (req, res) => {
  const newJar = req.body.jarName;
  const author = req.user._id;
  try {
    const jar = await JarModel.create({ jarName: newJar, author: author });
    await UserModel.findById(author, (err, result) => {
      if (err) res.status(400).json({ redirectURL: "/login" });
      result.jars.push(jar);
      result.save();
    }).clone();

    res.status(200).send(jar);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//check author
export const getJarData = (req, res) => {
  const id = req.params.id;
  const user = req.user;

  try {
    JarModel.findById(id)
      .populate("cookies")
      .exec((err, result) => {
        if (err) res.status(400).json({ error: err });
        if (user) {
          if (!result.author.includes(user._id)) {
            res.status(200).json({ jar: result, access: false });
          } else {
            res.status(200).json({ jar: result, access: true });
          }
        } else {
          res.status(200).json({ jar: result, access: false });
        }
      });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//require auth
//check author
export const deleteJar = async (req, res) => {
  const id = req.params.id;
  const user = req.user._id;
  try {
    await JarModel.findById(id, (err, result) => {
      if (err) res.status(400).json({ Error: err });

      if (!result.author.includes(user)) {
        res.status(400).json({ Error: "Not authorized" });
      }
      const cookieArray = result.cookies;
      for (let i = 0; i < cookieArray.length; i++) {
        CookieModel.findByIdAndRemove(cookieArray[i], (err, result) => {
          if (err) res.status(400).json({ Error: err });
          cloudinary.v2.uploader.destroy(
            result.cookieImage_id,
            (err, result) => {
              if (err) res.status(400).json({ Error: err });
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
      if (err) res.status(400).json({ Error: err });
      return;
    }).clone();

    res.status(200).send("jar deleted");
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

//require auth
export const getCookieData = (req, res) => {
  const id = req.params.id;
  const user = req.user._id;
  try {
    CookieModel.findById(id)
      .populate("jar", "author")
      .exec((err, result) => {
        if (err) res.status(400).json({ Error: err });
        if (result.jar.author.includes(user)) {
          res.status(200).json({ cookie: result, access: true });
        } else {
          res.status(200).json({ cookie: result, access: false });
        }
      });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
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
        if (err) res.status(500).json({ Error: err });
        return;
      }
    );

    const cookie = await CookieModel.create({
      cookieTitle: newCookieTitle,
      cookieContent: newCookieContent,
      cookieImage: imageUploadResult.secure_url,
      cookieImage_id: imageUploadResult.public_id,
      jar: id,
      read: false,
    });

    await JarModel.findById(id, async (err, result) => {
      if (err) res.status(400).json({ Error: error });
      result.cookies.push(cookie);
      result.save();
    }).clone();

    res.status(200).send(cookie);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

//require auth
//check author
export const updateCookieToRead = async (req, res) => {
  const cookieID = req.body.id;
  const cookieUpdate = req.body.read;
  const user = req.user._id;
  try {
    CookieModel.findById(cookieID)
      .populate("jar", "author")
      .exec((err, result) => {
        if (err) res.status(400).json({ Error: err });
        if (result.jar.author.includes(user)) {
          result.read = cookieUpdate;
          result.save();
          res.status(200).json({ cookie: result, access: true });
        } else {
          res.status(400).json({ access: false });
        }
      });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

//require auth
export const deleteCookie = async (req, res) => {
  const cookieID = req.params.id;
  try {
    const cookie = await CookieModel.findById(cookieID, (err, cookie) => {
      if (err) res.status(400).json({ Error: err });
      return;
    }).clone();

    await JarModel.findById(cookie.jar, (err, jar) => {
      if (err) res.status(400).json({ Error: err });
      jar.cookies.remove(cookie);
      jar.save();
    }).clone();

    await CookieModel.findByIdAndRemove(cookieID, (err, result) => {
      if (err) res.status(400).json({ Error: err });
      return;
    }).clone();

    await cloudinary.v2.uploader.destroy(
      cookie.cookieImage_id,
      (err, result) => {
        if (err) res.status(400).json({ Error: err });
        return;
      }
    );

    res.status(200).json(cookie);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};
