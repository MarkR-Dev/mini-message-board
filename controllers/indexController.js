const CustomNotFoundError = require("../errors/CustomNotFoundError");
const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const validateMessage = [
  body("author")
    .isAlpha()
    .withMessage("Author must only contain letters.")
    .isLength({ min: 1, max: 255 })
    .withMessage("Author must be between 1 and 255 characters."),
  body("message")
    .isLength({ min: 1, max: 255 })
    .withMessage("Message must be between 1 and 255 characters."),
];

async function getMessage(req, res) {
  const messageId = req.params.messageId;
  const message = await db.getMessage(messageId);

  if (message.length === 0) {
    throw new CustomNotFoundError("Message Not Found");
  }

  res.render("message", {
    title: "Mini Message Board | Message",
    message: message[0],
  });
}

async function deleteMessage(req, res) {
  const messageId = req.params.messageId;

  await db.deleteMessage(messageId);

  res.redirect("/");
}

function messageFormGet(req, res) {
  res.render("form", {
    title: "Mini Message Board | New",
    prevData: { text: "", author: "" },
  });
}

const createMessage = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const { message, author } = matchedData(req);
      return res.status(400).render("form", {
        title: "Mini Message Board | New",
        errors: errors.array(),
        prevData: { text: message, author: author },
      });
    }

    const { message, author } = matchedData(req);
    await db.createMessage({ text: message, author: author });

    res.redirect("/");
  },
];

module.exports = { getMessage, createMessage, deleteMessage, messageFormGet };
