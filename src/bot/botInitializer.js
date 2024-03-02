const { Client, GatewayIntentBits } = require("discord.js");
const {
  registerEventHandlers,
} = require("./eventHandlers/registerEventHandlers");

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

registerEventHandlers(bot);

module.exports = { bot };
