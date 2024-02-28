const {
  checkIfAuthorIsBotOwner,
  checkIfCommandIsValid,
  checkIfMessageIsInGuild,
  checkIfAmountIsValid,
  checkIfUserIsInGuild,
  validateMessage,
  checkIsContentStartWithPrefix,
} = require("../../src/utils/validationUtils");

require("dotenv").config({ path: "./config/.env" });

const BOT_OWNER_ID = process.env.BOT_OWNER_ID;
const PREFIX = process.env.PREFIX;

describe("ValidationUtils function tests", () => {
  let message;
  let sendChannelMessageSpy;

  beforeEach(() => {
    sendChannelMessageSpy = jest.fn();
    message = {
      channel: {
        createMessage: sendChannelMessageSpy,
        guild: { id: "guildId" },
      },
      author: { id: "123" },
      content: "pb!test",
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("checkIfAuthorIsBotOwner function tests", () => {
    test("should return true for valid owneId", () => {
      const ownerID = BOT_OWNER_ID;
      message.author.id = BOT_OWNER_ID;
      const isAuthor = checkIfAuthorIsBotOwner(message, ownerID);

      expect(isAuthor).toBe(true);
      expect(sendChannelMessageSpy).not.toHaveBeenCalled();
    });

    test('should return false for invalid ownerId and call sendChannelMessage with "Only the owner of the bot can use this command.', () => {
      const ownerID = "1";

      const result = checkIfAuthorIsBotOwner(message, ownerID);
      expect(result).toBe(false);
      expect(sendChannelMessageSpy).toHaveBeenCalledWith(
        "Only the owner of the bot can use this command."
      );
    });
  });

  describe("checkIfCommandIsValid function tests", () => {
    test("should return true for valid commands", () => {
      const command = "addpayment";
      const isValid = checkIfCommandIsValid(message, command);
      expect(isValid).toBe(true);
      expect(sendChannelMessageSpy).not.toHaveBeenCalled();
    });

    test('should return false and call sendChannelMessage with "Command not found." if the command is undefined', () => {
      const command = undefined;
      const result = checkIfCommandIsValid(message, command);
      expect(result).toBe(false);
      expect(sendChannelMessageSpy).toHaveBeenCalledWith("Command not found.");
    });

    test('should return false and call sendChannelMessage with "Command not found." if the command is null', () => {
      const command = null;
      const result = checkIfCommandIsValid(message, command);
      expect(result).toBe(false);
      expect(sendChannelMessageSpy).toHaveBeenCalledWith("Command not found.");
    });
  });

  describe("checkIfMessageIsInGuild function tests", () => {
    test("should return false for invalid guild and call sendChannelMessage with 'Commands can only be used in a guild.'", () => {
      delete message.channel.guild;
      const result = checkIfMessageIsInGuild(message);
      expect(result).toBe(false);
      expect(sendChannelMessageSpy).toHaveBeenCalledWith(
        "Commands can only be used in a guild."
      );
    });

    test("should return false for undefined guild and call sendChannelMessage with 'Commands can only be used in a guild.'", () => {
      message.channel.guild = undefined;
      const result = checkIfMessageIsInGuild(message);
      expect(result).toBe(false);
      expect(sendChannelMessageSpy).toHaveBeenCalledWith(
        "Commands can only be used in a guild."
      );
    });

    test("should return false for null guild and call sendChannelMessage with 'Commands can only be used in a guild.'", () => {
      message.channel.guild = null;

      const result = checkIfMessageIsInGuild(message);
      expect(result).toBe(false);
      expect(sendChannelMessageSpy).toHaveBeenCalledWith(
        "Commands can only be used in a guild."
      );
    });

    test("should return true for valid guild", () => {
      message.channel.guild = "1";

      const result = checkIfMessageIsInGuild(message);
      expect(result).toBe(true);
      expect(sendChannelMessageSpy).not.toHaveBeenCalled();
    });
  });

  describe("checkIfAmountIsValid function tests", () => {
    test("should return true for a valid amount", () => {
      const amount = 100;

      const isValid = checkIfAmountIsValid(message, amount);
      expect(isValid).toBe(true);
      expect(sendChannelMessageSpy).not.toHaveBeenCalled();
    });

    test("should return false and send a message for an invalid amount", () => {
      const amount = "invalid";

      const isValid = checkIfAmountIsValid(message, amount);
      expect(isValid).toBe(false);
      expect(sendChannelMessageSpy).toHaveBeenCalledWith(
        "Invalid donation amount."
      );
    });
  });

  describe("checkIfUserIsInGuild function tests", () => {
    test("should return true if member exists", () => {
      const member = { id: "123", name: "Test User" };
      const result = checkIfUserIsInGuild(message, member);
      expect(result).toBe(true);
      expect(sendChannelMessageSpy).not.toHaveBeenCalled();
    });

    test("should return false and send a message if member does not exist", () => {
      const member = null;
      const result = checkIfUserIsInGuild(message, member);
      expect(result).toBe(false);
      expect(sendChannelMessageSpy).toHaveBeenCalledWith(
        "User not found in this guild."
      );
    });
  });

  describe("checkIsContentStartWithPrefix function", () => {
    test("should return true if message content starts with prefix", () => {
      const message = { content: `${PREFIX}addpayment` };
      const result = checkIsContentStartWithPrefix(message, (prefix = PREFIX));
      expect(result).toBe(true);
    });

    test("should return false if message content does not start with prefix", () => {
      const message = { content: "hello" };
      const result = checkIsContentStartWithPrefix(message, (prefix = PREFIX));
      expect(result).toBe(false);
    });
  });
});
