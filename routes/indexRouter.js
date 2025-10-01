const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.send("Index GET");
});

indexRouter.get("/new", (req, res) => {
  res.send("/new GET");
});

module.exports = indexRouter;
