const { Client, GatewayIntentBits } = require("discord.js");
const { registerEventHandlers } = require("../handlers/eventHandler");
const { BOT_TOKEN } = require("../../config/config");

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

registerEventHandlers(bot);

bot.login(BOT_TOKEN);
