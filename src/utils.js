const { PREFIX, BOT_OWNER_ID } = require("../config/config");

const createChannelMessage = async (msg, text) => {
  await msg.channel.createMessage(text);
};

const parseCommand = (msg) => {
  if (!msg.content.startsWith(PREFIX)) return null;

  const parts = msg.content.slice(PREFIX.length).trim().split(/\s+/);
  const commandName = parts.shift().toLowerCase();
  return { commandName, args: parts };
};

const isAuthorBotOwner = async (msg) => {
  if (msg.author.id !== BOT_OWNER_ID) {
    await createChannelMessage(
      msg,
      "Only the owner of the bot can use this command."
    );
    return false;
  }
  return true;
};

const isValidCommand = (msg, command) => {
  if (!msg.channel.guild) {
    createChannelMessage(msg, "Commands can only be used in a guild.");
    return false;
  }
  if (!command) {
    createChannelMessage(msg, "Command not found.");
    return false;
  }
  return true;
};

const extractUserId = (mention) => mention.replace(/<@!?(.*?)>/, "$1");

const getMessageDetails = (msg, args) => {
  const [mention, rawAmount] = args;
  const amount = parseFloat(rawAmount);
  const userId = extractUserId(mention);
  const member = msg.channel.guild.members.get(userId);
  const guild = msg.channel.guild;

  return { member, userId, guild, amount: amount.toFixed(2), mention };
};

const isAmountValid = (msg, amount) => {
  if (isNaN(amount)) {
    createChannelMessage(msg, "Invalid donation amount.");
    return false;
  }
  return true;
};

const isUserInGuild = (msg, member) => {
  if (!member) {
    createChannelMessage(msg, "User not found in this guild.");
    return false;
  }
  return true;
};

module.exports = {
  parseCommand,
  isValidCommand,
  isAuthorBotOwner,
  createChannelMessage,
  getMessageDetails,
  isAmountValid,
  isUserInGuild,
};
