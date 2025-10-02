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
  res.render("index", {
    title: "Mini Message Board | Home",
    messages: messages,
  });
});

indexRouter.get("/new", (req, res) => {
  res.render("form", { title: "Mini Message Board | New" });
});

indexRouter.post("/new", (req, res) => {
  // todo
  res.send("/new");
});

module.exports = indexRouter;
