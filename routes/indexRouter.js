const { Router } = require("express");

const indexRouter = Router();

const {
  getMessage,
  createMessage,
  deleteMessage,
  messageFormGet,
} = require("../controllers/indexController");

const db = require("../db/queries");

indexRouter.get("/", async (req, res) => {
  const messages = await db.getAllMessages();
  res.render("index", {
    title: "Mini Message Board | Home",
    messages: messages,
  });
});

indexRouter.get("/messages/:messageId", getMessage);

indexRouter.post("/messages/:messageId/delete", deleteMessage);

indexRouter.get("/new", messageFormGet);

indexRouter.post("/new", createMessage);

module.exports = indexRouter;
