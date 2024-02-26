const { PREFIX } = require("../config/config");
const { BOT_OWNER_ID } = require("../config/config");

const createChannelMessage = async (msg, text) => {
  await msg.channel.createMessage(text);
};

const parseCommand = (msg) => {
  if (!msg.content.startsWith(PREFIX)) return;

  const parts = msg.content.slice(PREFIX.length).trim().split(/\s+/);
  const commandName = parts.shift().toLowerCase();
  return { commandName, args: parts };
};

const isAuthorBotOwner = async (msg) => {
  if (msg.author.id !== BOT_OWNER_ID)
    return createChannelMessage(
      msg,
      "Only the owner of the bot can use this command."
    );
};

const isValidCommand = (msg, command) => {
  if (!msg.channel.guild) return false;
  if (!command) return false;

  return true;
};
const extractUserId = (mention) => mention.replace(/<@!?(.*?)>/, "$1");

const getMessageDetails = (msg, args) => {
  const [mention, rawAmount] = args;
  const amount = parseFloat(rawAmount).toFixed(2);
  const userId = extractUserId(mention);
  const member = msg.channel.guild.members.get(userId);
  const guild = msg.channel.guild;

  return { member, userId, guild, amount, mention };
};

module.exports = {
  parseCommand,
  isValidCommand,
  isAuthorBotOwner,
  createChannelMessage,
  getMessageDetails,
};
