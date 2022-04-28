const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
import { Request, Response, NextFunction } from "express";
const bodyParser = require("body-parser");
const routes = require("./routes").routes;
const app = express();
const port = 8080;
var cors = require("cors");
const connectDB = require("./services/db");
app.use(cors()); // Use this after the variable declaration

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", routes);

app.get("*", function (req: Request, res: Response) {
  res.status(404).json({ message: "Not a valid endpoint" });
});

app.listen(port, () => console.log("API listening on port %s!", port));
