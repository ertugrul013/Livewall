// Download Service
const DownloadRoutes = require("express").Router();
import { Request, Response } from "express";
import { join, resolve } from "path";

DownloadRoutes.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const uploadPath = resolve("../backend/uploads/");
  const trimmedFile = uploadPath + "/trimmed/" + id + ".mp4";
  res.download(trimmedFile, function (err) {
    console.log("downloading....");
  });
});

module.exports = DownloadRoutes;
