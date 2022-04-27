const UploadRoutes = require("express").Router();
import { Request, Response } from "express";
import getVideoDurationInSeconds from "get-video-duration";
import multer from "multer";
const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + " - " + file.originalname);
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
      console.log("time in ms: " + duration * 1000);
      return res.status(200).json({
        message: "ok",
        duration: duration,
      });
    });
  }
);

module.exports = UploadRoutes;
