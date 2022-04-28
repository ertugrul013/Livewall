const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const TrimRoutes = require("express").Router();
import { Request, Response } from "express";
import path from "path";
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

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
