const messages = require("../model/messages");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

function getMessage(req, res) {
  const message = messages[req.params.messageId - 1];

  if (!message) {
    throw new CustomNotFoundError("Message Not Found");
  }

  res.render("message", {
    title: "Mini Message Board | Message",
    message: message,
  });
}

function createMessage(req, res) {
  const { message, author } = req.body;

  messages.push({
    text: message,
    user: author,
    added: new Date(),
  });

  res.redirect("/");
}

module.exports = { getMessage, createMessage };
