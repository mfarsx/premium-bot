const { BOT_TOKEN } = require("../config/config");
const messageCommandHandler = require("./messageCommandHandler");
const handleError = require("./error");

const eris = require("eris");

const bot = new eris.Client(BOT_TOKEN);

bot.on("ready", () => {
  console.log("Connected and ready.");
});

bot.on("messageCreate", messageCommandHandler);
bot.on("error", handleError);

bot.connect();
