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
  ffmpeg(path.resolve("../backend/uploads/" + id + ".mp4"))
    .setStartTime(minS)
    .setDuration(maxS)
    .output(path.resolve("../backend/uploads/trimmed/" + id + ".mp4"))
    .on("progress", function (progress) {
      console.log("converting: " + progress.percent);
    })
    .on("end", function (err) {
      if (!err) {
        console.log("successfully converted");
      }
    })
    .on("error", function (err) {
      console.log("conversion error: ", +err.message);
    })
    .run();
});

module.exports = TrimRoutes;
