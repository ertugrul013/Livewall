const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const PlayRoutes = require("express").Router();
import { Request, Response } from "express";
import path from "path";
import { createReadStream, statSync } from "fs";

PlayRoutes.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const uploadPath = path.resolve("./uploads");
  const trimmedFile = uploadPath + "/trimmed/" + id + ".mp4";

  const stat = statSync(trimmedFile);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = createReadStream(trimmedFile, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    createReadStream(trimmedFile).pipe(res);
  }
});

module.exports = PlayRoutes;
