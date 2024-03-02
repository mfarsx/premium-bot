const { PREFIX, BOT_OWNER_ID } = require("../../../config/config");

const validateMessage = (message) => {
  if (!message.guild) return false;
  if (!checkIsContentStartWithPrefix(message, PREFIX)) return false;
  if (!checkIfAuthorIsBotOwner(message, BOT_OWNER_ID)) return false;
  return true;
};

const validateCommand = (message, commandName, args) => {
  if (!checkIfCommandIsValid(message, commandName)) return false;
  if (args.length > 1 && !checkIfAmountIsValid(message, args[1])) return false;
  return true;
};

module.exports = { validateMessage, validateCommand };
