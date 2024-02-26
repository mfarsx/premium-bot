const { commandForName } = require("./commands");
const {
  parseCommand,
  isValidCommand,
  isAuthorBotOwner,
  createChannelMessage,
} = require("./utils");

async function messageCommandHandler(msg) {
  if (!msg.channel.guild) return;

  const parsed = parseCommand(msg);
  if (!parsed) return;

  const authorCheck = await isAuthorBotOwner(msg);
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
