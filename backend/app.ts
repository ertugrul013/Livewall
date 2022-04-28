const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
import { Request, Response } from "express";
const bodyParser = require("body-parser");
const routes = require("./routes").routes;
const app = express();
const port = 8080;
var cors = require("cors");
const connectDB = require("./services/db");
app.use(cors()); // Use this after the variable declaration

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", routes);

app.get("*", function (req: Request, res: Response) {
  res.status(404).json({ message: "Not a valid endpoint" });
});

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
