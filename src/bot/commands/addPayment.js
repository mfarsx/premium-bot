const { updateMemberRoleForDonation } = require("../services/roles");
const {
  extractDetailsFromMessage,
  sendChannelMessage,
} = require("../utils/messageUtils");

const createAddPaymentCommand = async (PREMIUM_CUTOFF) => {
  return {
    botOwnerOnly: true,
    execute: async (message, args) => {
      const { member, userId, guild, donationAmount, userMention } =
        extractDetailsFromMessage(message, args);

      await Promise.all([
        sendChannelMessage(message, `${userMention} paid $${donationAmount}`),
        updateMemberRoleForDonation(
          guild,
          member,
          donationAmount,
          PREMIUM_CUTOFF
        ),
      ]);
    },
    description: "Processes user payments and updates roles accordingly.",
  };
};

module.exports = createAddPaymentCommand;
