const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function getMessage(messageId) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    messageId,
  ]);
  return rows;
}

async function createMessage(message) {
  await pool.query(
    "INSERT INTO messages (username, message, date_posted) VALUES ($1, $2, NOW())",
    [message.author, message.text]
  );
}

async function deleteMessage(messageId) {
  await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
}

module.exports = {
  getAllMessages,
  getMessage,
  createMessage,
  deleteMessage,
};
