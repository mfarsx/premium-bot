const extractCommandFromMessage = (message, prefix) => {
  const parts = message.content.slice(prefix.length).trim().split(/\s+/);
  const commandName = parts.shift().toLowerCase();
  return { commandName, args: parts };
};

module.exports = {
  extractCommandFromMessage,
};
