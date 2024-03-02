const onReady = require("./events/onReady");
const onError = require("./events/onError");
const onMessageCreate = require("./events/onMessageCreate");

function registerEventHandlers(bot) {
  bot.once("ready", onReady);
  bot.on("error", onError);
  bot.on("messageCreate", onMessageCreate);
}

module.exports = { registerEventHandlers };
