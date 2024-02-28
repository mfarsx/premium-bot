const messageHandler = require("./messageHandler");

function onReady() {
  console.log("Bot is connected and ready.");
}

function onError(error) {
  console.error("An error occurred:", error);
}

function onMessageCreate(message) {
  if (message.author.bot) return;

  messageHandler(message);
}

function registerEventHandlers(bot) {
  bot.on("ready", onReady);
  bot.on("error", onError);
  bot.on("messageCreate", onMessageCreate);
}

module.exports = { registerEventHandlers };
