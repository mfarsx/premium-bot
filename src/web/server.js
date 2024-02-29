const express = require("express");
const WebhookListener = require("./listeners/WebhookListener");

const PORT = process.env.PORT || 80;

const app = express();
app.use(express.json());

const listener = new WebhookListener(app);
listener.setupRoutes();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = listener;
