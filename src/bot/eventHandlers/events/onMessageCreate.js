const messageHandler = require("../../handlers/messageHandler");

function onMessageCreate(message) {
  if (message.author.bot) return;
  messageHandler(message);
}

module.exports = onMessageCreate;
