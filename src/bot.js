const eris = require("eris");
require("dotenv").config({ path: "./config/.env" });

const PREFIX = "pb!";

const bot = new eris.Client(process.env.BOT_TOKEN);

bot.on("ready", () => {
  console.log("Connected and ready.");
});

const commandHandlerForCommandName = {};

commandHandlerForCommandName["addpayment"] = (message, args) => {
  const mention = args[0];
  const amount = parseFloat(args[1]);

  return message.channel.createMessage(`${mention} paid $${amount.toFixed(2)}`);
};

bot.on("messageCreate", async (message) => {
  const content = message.content;

  if (!message.channel.guild) {
    return;
  }
  if (!content.startsWith(PREFIX)) {
    return;
  }

  const parts = content
    .split(" ")
    .map((s) => s.trim())
    .filter((s) => s);

  const commandName = parts[0].substring(PREFIX.length);

  const commandHandler = commandHandlerForCommandName[commandName];
  if (!commandHandler) {
    return;
  }

  const args = parts.slice(1);

  try {
    await commandHandler(message, args);
  } catch (err) {
    console.warn("Error handling command");
    console.warn(err);
  }
});

bot.on("error", (err) => {
  console.warn(err);
});

bot.connect();
