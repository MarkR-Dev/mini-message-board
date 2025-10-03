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
  const { message, author } = req.body;

  messages.push({
    text: message,
    user: author,
    added: new Date(),
  });

  res.redirect("/");
});

module.exports = indexRouter;
