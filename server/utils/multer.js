import multer from "multer";
// export const upload = multer({ dest: "upload/" });

export const upload = multer({
  dest: "upload/",
  fileFilter: (req, file, cb) => {
    let ext = file.mimetype.split("/")[1];
    if (ext !== "jpg" && ext !== "jpeg" && ext !== "png" && ext !== "gif") {
      cb(new Error("File is not supported"), false);
    }
    cb(null, true);
  },
});
