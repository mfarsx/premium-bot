const sendChannelMessage = async (message, content) => {
  await message.channel.createMessage(content);
};

const getUserIdFromMention = (mention) => {
  return mention.replace(/<@!?(.*?)>/, "$1");
};

const extractDetailsFromMessage = (message, parameters) => {
  const [userMention, rawDonationAmount] = parameters;
  const donationAmount = parseFloat(rawDonationAmount);
  const userId = getUserIdFromMention(userMention);
  const member = message.channel.guild.members.get(userId);
  const guild = message.channel.guild;

  return {
    member,
    userId,
    guild,
    donationAmount: donationAmount.toFixed(2),
    userMention,
  };
};

module.exports = {
  sendChannelMessage,
  getUserIdFromMention,
  extractDetailsFromMessage,
};
