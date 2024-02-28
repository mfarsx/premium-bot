const {
  checkIfAuthorIsBotOwner,
  checkIfCommandIsValid,
  checkIfMessageIsInGuild,
  checkIfAmountIsValid,
  checkIfUserIsInGuild,
  checkIsContentStartWithPrefix,
} = require("../utils/validationUtils");
const { extractCommandFromMessage } = require("../utils/commandUtils");

const { PREFIX, BOT_OWNER_ID } = require("../../config/config");

const { commandFactory } = require("../commands/commandFactory");

async function messageHandler(message) {
  if (!checkIsContentStartWithPrefix(message, PREFIX)) return;
  if (!checkIfMessageIsInGuild(message)) return;
  if (!checkIfUserIsInGuild(message, message.member)) return;
  if (!checkIfAuthorIsBotOwner(message, BOT_OWNER_ID)) return;

  const { commandName, args } = extractCommandFromMessage(message, PREFIX);

  if (!checkIfCommandIsValid(message, commandName)) return;
  if (!checkIfAmountIsValid(message, (amount = args[1]))) return;

  const command = await commandFactory.createCommand(commandName);

  try {
    await command.execute(message, args);
  } catch (err) {
    console.error("An error occurred while running the command:", err);
    await createChannelMessage(
      message,
      "An error occurred, please try again later."
    );
  }
}

module.exports = messageHandler;
