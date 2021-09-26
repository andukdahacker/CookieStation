import { JarModel } from "../models/JarModel.js";

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
