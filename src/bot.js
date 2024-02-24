const eris = require("eris");
require("dotenv").config({ path: "./config/.env" });

const bot = new eris.Client(process.env.BOT_TOKEN);

bot.on("ready", () => {
  console.log("Connected and ready.");
});

bot.on("messageCreate", async (message) => {
  const botWasMentioned = message.mentions.find(
    (mentionedUser) => mentionedUser.id === bot.user.id
  );

  if (botWasMentioned) {
    try {
      await message.channel.createMessage("Present");
    } catch (error) {
      console.warn("Failed to respond to mention");
      console.warn(error);
    }
  }
});

bot.on("error", (error) => {
  console.warn(error);
});

bot.connect();
