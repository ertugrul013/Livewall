const UploadRoutes = require("express").Router();
import { Request, Response } from "express";
import getVideoDurationInSeconds from "get-video-duration";
import { createModel } from "mongoose-gridfs";
import { createReadStream, unlink } from "fs";
import multer from "multer";

let id = 0;

const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, id.toString() + ".mp4");
  },
});

const storageUpload = multer({
  storage: uploadStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "video/mp4") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

UploadRoutes.post(
  "/",
  storageUpload.single("file"),
  (req: Request, res: Response) => {
    // @ts-ignore: Object is possibly 'undefined'
    getVideoDurationInSeconds(req.file.path).then((duration) => {
      const ms = duration * 1000;
      console.log("time in ms: " + ms);
      id = id + 1;
      return res.status(200).json({
        message: "ok",
        duration: ms,
        id: id - 1,
      });
    });
  }
);

UploadRoutes.post("/database", (req: Request, res: Response) => {
  const { id } = req.body;
  const trimmedFile = "./uploads/trimmed/" + id + ".mp4";
  const readStream = createReadStream(trimmedFile);
  const options = {
    filename: id.toString() + ".mp4",
    content_type: "video/mp4",
  };
  const Trimmed = createModel();

  Trimmed.write(options, readStream, (err, file) => {
    if (err) {
      console.log(err);
      // delete files from uploads folder
      unlink("./uploads/" + id + ".mp4", (err) => {
        if (err) console.log(err);
      });

      return res.status(500).json({
        message: "error",
      });
    }
    console.log(file._id);
    console.log("file uploaded");
    return res.status(200).json({
      message: "ok",
      id,
    });
  });
});
module.exports = UploadRoutes;
