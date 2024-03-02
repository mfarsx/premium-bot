const express = require("express");

const { bot } = require("./bot/botInitializer");
const { BOT_TOKEN } = require("../config/config");

const WebhookListener = require("./web/listeners/WebhookListener");
const { handleDonationWebhook } = require("./bot/handlers/webhookHandler");

bot.login(BOT_TOKEN);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 80;
const listener = new WebhookListener(app);

listener.setupRoutes();
listener.on("donation", handleDonationWebhook);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
