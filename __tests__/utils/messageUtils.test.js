const {
  sendChannelMessage,
  getUserIdFromMention,
  extractDetailsFromMessage,
} = require("../../src/utils/messageUtils");

describe("Utility function tests", () => {
  let message;
  let sendChannelMessage;

  beforeEach(() => {
    sendChannelMessage = jest.fn();
    message = {
      channel: {
        sendChannelMessage: sendChannelMessage,
        guild: { id: "guildId" },
      },
      author: { id: "" },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserIdFromMention function", () => {
    test("should extract numeric ID from a mention with exclamation mark", () => {
      const mention = "<@!123456789>";
      expect(getUserIdFromMention(mention)).toBe("123456789");
    });

    test("should extract numeric ID from a mention without exclamation mark", () => {
      const mention = "<@123456789>";
      expect(getUserIdFromMention(mention)).toBe("123456789");
    });

    test("should return the original string if it does not match mention pattern", () => {
      const notMention = "This is not a mention";
      expect(getUserIdFromMention(notMention)).toBe("This is not a mention");
    });
  });

  describe("extractDetailsFromMessage function", () => {
    const mockMember = { id: "123", name: "Test User" };
    const mockGuild = {
      members: {
        get: jest.fn((userId) => (userId === "123" ? mockMember : null)),
      },
    };

    test("should correctly parse message details", () => {
      const message = {
        content: "!command 123 456.788",
        channel: {
          guild: mockGuild,
        },
      };
      const args = ["<@123>", "456.788"];
      const result = extractDetailsFromMessage(message, args);

      expect(result).toEqual({
        member: mockMember,
        userId: "123",
        guild: mockGuild,
        donationAmount: "456.79",
        userMention: "<@123>",
      });
      expect(mockGuild.members.get).toHaveBeenCalledWith("123");
    });
  });

  describe("sendChannelMessage function", () => {
    test("should call message.channel.sendChannelMessage with the correct text", async () => {
      const content = "Test message";
      await sendChannelMessage(message, content);
      expect(sendChannelMessage).toHaveBeenCalledWith(message, content);
    });
  });
});
