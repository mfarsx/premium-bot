const { commandForName } = require("./commands");
const {
  parseCommand,
  isValidCommand,
  isAuthorBotOwner,
  createChannelMessage,
  isValidGuild,
} = require("./utils");

const { PREFIX, BOT_OWNER_ID } = require("../config/config");

async function messageCommandHandler(msg) {
  if (!isValidGuild(msg)) return;

  const parsed = parseCommand(msg, PREFIX);
  if (!parsed) return;

  const authorCheck = await isAuthorBotOwner(msg, BOT_OWNER_ID);
  if (!authorCheck) return;

  const { commandName, args } = parsed;
  const command = commandForName[commandName];

  if (!isValidCommand(msg, command)) return;

  try {
    await command.execute(msg, args);
  } catch (err) {
    console.error("An error occurred while running the command:", err);
    await createChannelMessage(
      msg,
      "An error occurred, please try again later."
    );
  }
}

module.exports = messageCommandHandler;
