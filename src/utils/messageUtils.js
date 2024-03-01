const sendChannelMessage = async (message, content) => {
  await message.channel.send(content);
};

const getUserIdFromMention = (mention) => {
  const matches = mention.match(/^<@!?(\d+)>$/);
  if (!matches) return null;
  const userId = matches[1];
  return userId;
};

const extractDetailsFromMessage = (message, parameters) => {
  const [userMention, rawDonationAmount] = parameters;
  const donationAmount = parseFloat(rawDonationAmount).toFixed(2);
  const userId = getUserIdFromMention(userMention);

  const member = message.guild.members.cache.get(userId);
  const guild = message.guild;

  return {
    member,
    userId,
    guild,
    donationAmount,
    userMention,
  };
};

module.exports = {
  sendChannelMessage,
  getUserIdFromMention,
  extractDetailsFromMessage,
};
