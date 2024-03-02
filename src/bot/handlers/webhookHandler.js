const { updateMemberRoleForDonation } = require("../services/roles");
const { bot } = require("../../bot/botInitializer");

function findUserInString(messageContent) {
  const match = messageContent.match(/(\w+)#(\d{4})/);
  if (!match) return null;

  const [, username, discriminator] = match;
  const user = bot.users.cache.find(
    (user) => user.username === username && user.discriminator === discriminator
  );
  return user;
}

async function handleDonationWebhook(
  paymentSource,
  paymentId,
  timestamp,
  amount,
  senderName,
  messageContent
) {
  try {
    const user = findUserInString(messageContent);
    const guild = bot.guilds.cache.find((guild) =>
      guild.members.cache.has(user?.id)
    );
    console.log(user);
    const guildMember = guild ? await guild.members.fetch(user.id) : null;

    if (!guildMember) {
      throw new Error(`Guild member not found for user ${user.tag}`);
    }

    // await updateMemberRoleForDonation(guild, guildMember, amount);
    // await logDonation(guildMember, amount, paymentSource, paymentId, senderName, messageContent, timestamp);

    console.log("Donation processed successfully.");
  } catch (err) {
    console.warn("Error updating donor role and logging donation");
    console.warn(err);
  }
}

const logAllUser = async () => {
  console.log(`Logged in as ${bot.user.tag}!`);

  // Sunucu ID'si
  const guildId = "1196970506574905467";
  const guild = bot.guilds.cache.get(guildId);

  if (!guild) {
    console.error(`Guild with ID ${guildId} not found`);
    return;
  }

  try {
    // Sunucudaki tüm üyeleri çek
    await guild.members.fetch();

    // Tüm kullanıcıları logla
    guild.members.cache.forEach((member) => {
      console.log(`${member.user.tag} (${member.id})`);
    });
  } catch (error) {
    console.error("Error fetching members:", error);
  }
};

module.exports = { handleDonationWebhook };
