const { updateMemberRoleForDonation } = require("./roles");
const { getMessageDetails, createChannelMessage } = require("./utils");

const { PREMIUM_CUTOFF } = require("../config/config");

const commandForName = {};

commandForName["addpayment"] = {
  botOwnerOnly: true,
  execute: async (msg, args) => {
    const { member, userId, guild, amount, mention } = getMessageDetails(
      msg,
      args
    );

    await Promise.all([
      createChannelMessage(msg, `${mention} paid $${amount}`),
      updateMemberRoleForDonation(guild, member, amount, PREMIUM_CUTOFF),
    ]);
  },
};

module.exports = { commandForName };
