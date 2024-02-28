const eris = require("eris");
const { registerEventHandlers } = require("../handlers/eventHandler");
const { BOT_TOKEN } = require("../../config/config");

const bot = new eris.Client(BOT_TOKEN);

registerEventHandlers(bot);

bot.connect();
