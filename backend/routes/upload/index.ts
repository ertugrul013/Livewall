const UploadRoutes = require("express").Router();
import { Request, Response } from "express";
import getVideoDurationInSeconds from "get-video-duration";
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
        id: id,
      });
    });
  }
);

module.exports = UploadRoutes;
