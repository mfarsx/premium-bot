const {
  parseCommand,
  isValidCommand,
  isAuthorBotOwner,
  isValidGuild,
  extractUserId,
  createChannelMessage,
  getMessageDetails,
  isAmountValid,
  isUserInGuild,
} = require("../src/utils");

require("dotenv").config({ path: "./config/.env" });

const PREFIX = process.env.PREFIX;
const BOT_OWNER_ID = process.env.BOT_OWNER_ID;

describe("Utility function tests", () => {
  let msg;
  let createChannelMessageSpy;

  beforeEach(() => {
    createChannelMessageSpy = jest.fn();
    msg = {
      channel: {
        createMessage: createChannelMessageSpy,
        guild: { id: "guildId" },
      },
      author: { id: "" },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("parseCommand function", () => {
    test("should correctly parse command name and arguments", () => {
      const msg = { content: `${PREFIX}test arg1 arg2` };
      const result = parseCommand(msg, PREFIX);
      expect(result).toEqual({
        commandName: "test",
        args: ["arg1", "arg2"],
      });
    });

    test("should correctly handle commands with empty arguments", () => {
      const msg = { content: `${PREFIX}test ` };
      const result = parseCommand(msg, PREFIX);
      expect(result).toEqual({
        commandName: "test",
        args: [],
      });
    });

    test("should return null for non-command messages", () => {
      const msg = { content: "This is not a command" };
      const result = parseCommand(msg, PREFIX);
      expect(result).toBeNull();
    });
  });

  describe("isValidCommand function tests", () => {
    test("should return true for valid commands", () => {
      const command = "addpayment";
      const isValid = isValidCommand(msg, command);
      expect(isValid).toBe(true);
      expect(createChannelMessageSpy).not.toHaveBeenCalled();
    });

    test('should return false and call createChannelMessage with "Command not found." if the command is undefined', () => {
      const command = undefined;
      const result = isValidCommand(msg, command);
      expect(result).toBe(false);
      expect(createChannelMessageSpy).toHaveBeenCalledWith(
        "Command not found."
      );
    });

    test('should return false and call createChannelMessage with "Command not found." if the command is null', () => {
      const command = null;
      const result = isValidCommand(msg, command);
      expect(result).toBe(false);
      expect(createChannelMessageSpy).toHaveBeenCalledWith(
        "Command not found."
      );
    });
  });

  describe("isAuthorBotOwner function tests", () => {
    test("should return true for valid owneId", () => {
      const ownerID = BOT_OWNER_ID;
      msg.author.id = BOT_OWNER_ID;
      const isAuthor = isAuthorBotOwner(msg, ownerID);

      expect(isAuthor).toBe(true);
      expect(createChannelMessageSpy).not.toHaveBeenCalled();
    });

    test('should return false for invalid ownerId and call createChannelMessage with "Only the owner of the bot can use this command.', () => {
      const ownerID = "1";

      const result = isAuthorBotOwner(msg, ownerID);
      expect(result).toBe(false);
      expect(createChannelMessageSpy).toHaveBeenCalledWith(
        "Only the owner of the bot can use this command."
      );
    });
  });

  describe("isValidGuild function tests", () => {
    test("should return false for invalid guild and call createChannelMessage with 'Commands can only be used in a guild.'", () => {
      delete msg.channel.guild;
      const result = isValidGuild(msg);
      expect(result).toBe(false);
      expect(createChannelMessageSpy).toHaveBeenCalledWith(
        "Commands can only be used in a guild."
      );
    });

    test("should return false for undefined guild and call createChannelMessage with 'Commands can only be used in a guild.'", () => {
      msg.channel.guild = undefined;
      const result = isValidGuild(msg);
      expect(result).toBe(false);
      expect(createChannelMessageSpy).toHaveBeenCalledWith(
        "Commands can only be used in a guild."
      );
    });

    test("should return false for null guild and call createChannelMessage with 'Commands can only be used in a guild.'", () => {
      msg.channel.guild = null;

      const result = isValidGuild(msg);
      expect(result).toBe(false);
      expect(createChannelMessageSpy).toHaveBeenCalledWith(
        "Commands can only be used in a guild."
      );
    });

    test("should return true for valid guild", () => {
      msg.channel.guild = "1";

      const result = isValidGuild(msg);
      expect(result).toBe(true);
      expect(createChannelMessageSpy).not.toHaveBeenCalled();
    });
  });

  describe("extractUserId function", () => {
    test("should extract numeric ID from a mention with exclamation mark", () => {
      const mention = "<@!123456789>";
      expect(extractUserId(mention)).toBe("123456789");
    });

    test("should extract numeric ID from a mention without exclamation mark", () => {
      const mention = "<@123456789>";
      expect(extractUserId(mention)).toBe("123456789");
    });

    test("should return the original string if it does not match mention pattern", () => {
      const notMention = "This is not a mention";
      expect(extractUserId(notMention)).toBe("This is not a mention");
    });
  });

  describe("getMessageDetails function", () => {
    const mockMember = { id: "123", name: "Test User" };
    const mockGuild = {
      members: {
        get: jest.fn((userId) => (userId === "123" ? mockMember : null)),
      },
    };

    test("should correctly parse message details", () => {
      const msg = {
        content: "!command 123 456.788",
        channel: {
          guild: mockGuild,
        },
      };
      const args = ["<@123>", "456.788"];
      const result = getMessageDetails(msg, args);

      expect(result).toEqual({
        member: mockMember,
        userId: "123",
        guild: mockGuild,
        amount: "456.79",
        mention: "<@123>",
      });
      expect(mockGuild.members.get).toHaveBeenCalledWith("123");
    });
  });

  describe("isAmountValid function", () => {
    test("should return true for a valid amount", () => {
      const amount = 100;

      const isValid = isAmountValid(msg, amount);
      expect(isValid).toBe(true);
      expect(createChannelMessageSpy).not.toHaveBeenCalled();
    });

    test("should return false and send a message for an invalid amount", () => {
      const amount = "invalid";

      const isValid = isAmountValid(msg, amount);
      expect(isValid).toBe(false);
      expect(createChannelMessageSpy).toHaveBeenCalledWith(
        "Invalid donation amount."
      );
    });
  });

  test("should return true if member exists", () => {
    const member = { id: "123", name: "Test User" };
    const result = isUserInGuild(msg, member);
    expect(result).toBe(true);
    expect(createChannelMessageSpy).not.toHaveBeenCalled();
  });

  test("should return false and send a message if member does not exist", () => {
    const member = null;
    const result = isUserInGuild(msg, member);
    expect(result).toBe(false);
    expect(createChannelMessageSpy).toHaveBeenCalledWith(
      "User not found in this guild."
    );
  });

  describe("createChannelMessage function", () => {
    test("should call msg.channel.createMessage with the correct text", async () => {
      const text = "Test message";
      await createChannelMessage(msg, text);
      expect(createChannelMessageSpy).toHaveBeenCalledWith(text);
    });
  });
});
