const { Router } = require("express");

const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "User1",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "User2",
    added: new Date(),
  },
];

indexRouter.get("/", (req, res) => {
  res.send("Index GET");
});

indexRouter.get("/new", (req, res) => {
  res.send("/new GET");
});

module.exports = indexRouter;
