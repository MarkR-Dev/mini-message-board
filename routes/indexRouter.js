const { Router } = require("express");

const indexRouter = Router();

const messages = require("../model/messages");
const { getMessage, createMessage } = require("../controllers/indexController");

const CustomNotFoundError = require("../errors/CustomNotFoundError");

indexRouter.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Message Board | Home",
    messages: messages,
  });
});

indexRouter.get("/messages/:messageId", getMessage);

indexRouter.get("/new", (req, res) => {
  res.render("form", { title: "Mini Message Board | New" });
});

indexRouter.post("/new", createMessage);

module.exports = indexRouter;
