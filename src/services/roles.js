const premiumRole = {
  name: "Premium Member",
  color: 0x6aa84f,
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

  let role = Array.from(guild.roles.values()).find(
    (role) => role.name === premiumRole.name
  );

  if (!role) {
    role = await guild.createRole(premiumRole).catch(console.error);
  }

  if (role) {
    await member
      .addRole(role.id, `Donated ${PREMIUM_CUTOFF} or more.`)
      .catch(console.error);
  }
}

module.exports = { updateMemberRoleForDonation };
