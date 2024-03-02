const premiumRole = {
  name: "Premium Member",
  color: "GREEN",
  hoist: true,
};

async function updateMemberRoleForDonation(
  guild,
  member,
  donationAmount,
  PREMIUM_CUTOFF
) {
  if (
    !guild ||
    !member ||
    isNaN(donationAmount) ||
    donationAmount < PREMIUM_CUTOFF
  ) {
    return;
  }

  let role = guild.roles.cache.find((role) => role.name === premiumRole.name);

  if (!role) {
    role = await guild.roles
      .create({
        name: premiumRole.name,
        color: premiumRole.color,
        hoist: premiumRole.hoist,
        reason: "Premium member role creation",
      })
      .catch(console.error);
  }

  if (role) {
    await member.roles
      .add(role, `Donated ${PREMIUM_CUTOFF} or more.`)
      .catch(console.error);
  }
}

module.exports = { updateMemberRoleForDonation };
