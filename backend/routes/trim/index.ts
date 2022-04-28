const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const TrimRoutes = require("express").Router();
import axios from "axios";
import { Request, Response } from "express";
import path from "path";
const ffmpeg = require("fluent-ffmpeg");
import crypto from "crypto";
ffmpeg.setFfmpegPath(ffmpegPath);
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { createReadStream, statSync } from "fs";

// const uploadStorage = new GridFsStorage({
//   url: process.env.MONGO_URI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "video",
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "video/mp4") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const storageUpload = multer({
//   storage: uploadStorage,
// });

TrimRoutes.post("/", (req: Request, res: Response) => {
  const { min, max, id } = req.body;
  const minS = min / 1000;
  const maxS = max / 1000;

  const uploadPath = path.resolve("../backend/uploads/");
  const file = uploadPath + "/" + id + ".mp4";
  const trimmedFile = uploadPath + "/trimmed/" + id + ".mp4";

  // trim video using ffmpeg and upload to mongodb using multer
  ffmpeg(file)
    .setStartTime(minS)
    .setDuration(maxS)
    .output(trimmedFile)
    .on("progress", function (progress) {
      console.log("converting: " + progress.percent);
    })
    .on("end", function (err) {
      if (!err) {
        console.log("successfully converted");
        res.status(200).json({
          id: id,
          message: "successfully converted",
        });
      }
    })
    .on("error", function (err) {
      console.log("conversion error: ", +err.message);
    })
    .run();
});

module.exports = TrimRoutes;
