const {
  checkIfAuthorIsBotOwner,
  checkIfCommandIsValid,
  checkIfAmountIsValid,
  checkIsContentStartWithPrefix,
} = require("../utils/validationUtils");
const { extractCommandFromMessage } = require("../utils/commandUtils");
const { PREFIX, BOT_OWNER_ID } = require("../../../config/config");
const { commandFactory } = require("../commands/commandFactory");

async function messageHandler(message) {
  if (!message.guild) return;

  if (!checkIsContentStartWithPrefix(message, PREFIX)) return;

  if (!checkIfAuthorIsBotOwner(message, BOT_OWNER_ID)) return;

  const { commandName, args } = extractCommandFromMessage(message, PREFIX);

  if (!checkIfCommandIsValid(message, commandName)) return;

  if (args.length > 1 && !checkIfAmountIsValid(message, args[1])) return;

  const command = await commandFactory.createCommand(commandName);
  if (command) {
    try {
      await command.execute(message, args);
    } catch (err) {
      console.error("An error occurred while running the command:", err);
      message.channel.send("An error occurred, please try again later.");
    }
  }
}

module.exports = messageHandler;
