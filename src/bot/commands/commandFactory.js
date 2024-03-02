const createAddPaymentCommand = require("./addPayment");

const { PREMIUM_CUTOFF } = require("../../../config/config");

const validCommands = new Set(["addpayment"]);

const commandFactory = {
  createCommand(commandName) {
    switch (commandName) {
      case "addpayment":
        return createAddPaymentCommand(PREMIUM_CUTOFF);
      default:
        return null;
    }
  },
};

module.exports = { commandFactory, validCommands };
