import express from "express";
import cors from "cors";
const morgan = require("morgan");
const { readdirSync } = require("fs");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

readdirSync("./routers").map((r) => {
  app.use("/api", require(`./routers/${r}`));
});

console.log(process.env.DB);

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successfully"))
  .catch((err) => console.log(err.message));

const port = 8000;

app.listen(port, () => {
  console.log("listening on the port " + port);
});
