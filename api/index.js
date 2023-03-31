const express = require("express");
const fileUpload = require("express-fileupload");
const glob = require("glob");
const path = require("path");
const { port } = require("./src/config");

const app = express();
const router = express.Router();

app.set("query-parser", "extended");
app.use(express.json());

// loads routes from folder into router
glob.sync("src/routes/*/*.js").forEach(function (file) {
  const setupRoute = require(path.resolve(file));
  setupRoute(router);
});

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  next();
});

app.use(fileUpload());

// setup router to match nginx api location
app.use("/api", router);

app.use("/", async (req, res, next) => {
  res.send({ online: true });
});

app.listen(port, () => {
  console.log(`Starting service on port ${port}`);
});
