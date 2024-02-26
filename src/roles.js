const { PREMIUM_CUTOFF } = require("dotenv").config({ path: "./config/.env" });
const premiumRole = {
  name: "Premium Member",
  color: 0x6aa84f,
  hoist: true,
};

async function updateMemberRoleForDonation(guild, member, donationAmount) {
  if (guild && member && donationAmount >= PREMIUM_CUTOFF) {
    let role = Array.from(guild.roles.values()).find(
      (role) => role.name === premiumRole.name
    );
    if (!role) {
      role = await guild.createRole(premiumRole);
    }
    return member.addRole(role.id, "Donated $10 or more.");
  }
}

module.exports = { updateMemberRoleForDonation };
