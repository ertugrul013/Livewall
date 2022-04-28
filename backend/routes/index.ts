// get all routes and return them
const routes = require("express").Router();
import { Request, Response } from "express";

routes.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the API",
    availableRoutes: [
      {
        path: "/video",
        method: "GET",
        description: "Get transcoded video",
        parameters: [
          {
            videoID: "int",
          },
        ],
      },
      {
        path: "/video",
        method: "POST",
        description: "upload video that needs to be transcoded",
        parameters: [
          {
            start: "string",
            end: "string",
            video: "stream",
          },
        ],
      },
    ],
  });
});

routes.use("/upload", require("./upload"));
routes.use("/trim", require("./trim"));
routes.use("/play", require("./play"));
export { routes };
