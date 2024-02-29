const EventEmitter = require("events");

class WebhookListener extends EventEmitter {
  constructor(app) {
    super();
    this.app = app;
  }

  setupRoutes() {
    this.app.post("/kofi", (req, res) => {
      const {
        message,
        timestamp,
        amount: rawAmount,
        from_name: senderName,
        message_id: paymentId,
      } = req.body.data;
      const amount = parseFloat(rawAmount);
      const paymentSource = "Ko-fi";

      res.send({ status: "OK" });

      this.emit(
        "donation",
        paymentSource,
        paymentId,
        timestamp,
        amount,
        senderName,
        message
      );
    });
  }
}

module.exports = WebhookListener;
