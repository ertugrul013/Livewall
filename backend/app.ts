const express = require("express");
import { Request, Response, NextFunction } from "express";
const bodyParser = require("body-parser");
const routes = require("./routes").routes;
const app = express();
const port = 8080;
var cors = require("cors");

app.use(cors()); // Use this after the variable declaration
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Content-Range"
  );
  res.header("Access-Control-Expose-Headers", "X-Total-Count, Content-Range");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", routes);

app.get("*", function (req: Request, res: Response) {
  res.status(404).json({ message: "Not a valid endpoint" });
});

app.listen(port, () => console.log("API listening on port %s!", port));
