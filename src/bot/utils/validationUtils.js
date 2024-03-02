const { sendChannelMessage } = require("./messageUtils");
const { validCommands } = require("../commands/commandFactory");

const messages = {
  ownerOnly: "Only the owner of the bot can use this command.",
  commandNotFound: "Command not found.",
  guildOnly: "Commands can only be used in a guild.",
  invalidAmount: "Invalid donation amount.",
  userNotFound: "User not found in this guild.",
};

const checkIfAuthorIsBotOwner = (message, BOT_OWNER_ID) => {
  if (message.author.id !== BOT_OWNER_ID) {
    sendChannelMessage(message, messages.ownerOnly);
    return false;
  }
  return true;
};

const checkIfCommandIsValid = (message, commandName) => {
  if (!validCommands.has(commandName)) {
    sendChannelMessage(message, messages.commandNotFound);
    return false;
  }
  return true;
};

const checkIfMessageIsInGuild = (message) => {
  if (!message.channel.guild) {
    sendChannelMessage(message, messages.guildOnly);
    return false;
  }
  return true;
};

const checkIfAmountIsValid = (message, amount) => {
  if (isNaN(amount)) {
    sendChannelMessage(message, messages.invalidAmount);
    return false;
  }
  return true;
};

const checkIfUserIsInGuild = (message, member) => {
  if (!member) {
    sendChannelMessage(message, messages.userNotFound);
    return false;
  }
  return true;
};

const checkIsContentStartWithPrefix = (message, prefix) => {
  return message.content.startsWith(prefix);
};

module.exports = {
  checkIfAuthorIsBotOwner,
  checkIfCommandIsValid,
  checkIfMessageIsInGuild,
  checkIfAmountIsValid,
  checkIfUserIsInGuild,
  checkIsContentStartWithPrefix,
};
