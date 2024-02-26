const {
  parseCommand,
  isValidCommand,
  isAuthorBotOwner,
  createChannelMessage,
  getMessageDetails,
  isAmountValid,
  isUserInGuild,
} = require("../src/utils");

require("dotenv").config({ path: "./config/.env" });

const PREFIX = process.env.PREFIX;
const BOT_OWNER_ID = process.env.BOT_OWNER_ID;

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
  let createChannelMessageSpy;
  let msg;
  beforeEach(() => {
    createChannelMessageSpy = jest.fn();

    msg = {
      channel: {
        createMessage: createChannelMessageSpy,
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return true for valid commands", () => {
    const command = "addpayment";

    const isValid = isValidCommand(msg, command);

    expect(isValid).toBe(true);
    expect(createChannelMessageSpy).not.toHaveBeenCalled();
  });

  it('should return false and call createChannelMessage with "Command not found." if the command is undefined', () => {
    const command = undefined;

    const result = isValidCommand(msg, command);
    expect(result).toBe(false);
    expect(createChannelMessageSpy).toHaveBeenCalledWith("Command not found.");
  });

  it('should return false and call createChannelMessage with "Command not found." if the command is null', () => {
    const command = null;

    const result = isValidCommand(msg, command);
    expect(result).toBe(false);
    expect(createChannelMessageSpy).toHaveBeenCalledWith("Command not found.");
  });
});

describe("isAuthorBotOwner function tests", () => {
  let createChannelMessageSpy;
  let msg;
  beforeEach(() => {
    createChannelMessageSpy = jest.fn();

    msg = {
      channel: {
        createMessage: createChannelMessageSpy,
      },
      author: {
        id: "",
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return true for valid owner id", () => {
    const ownerID = BOT_OWNER_ID;
    msg.author.id = BOT_OWNER_ID;
    const isAuthor = isAuthorBotOwner(msg, ownerID);

    expect(isAuthor).toBe(true);
    expect(createChannelMessageSpy).not.toHaveBeenCalled();
  });

  it('should return false and call createChannelMessage with "Only the owner of the bot can use this command.', () => {
    const ownerID = "1";

    const result = isAuthorBotOwner(msg, ownerID);
    expect(result).toBe(false);
    expect(createChannelMessageSpy).toHaveBeenCalledWith(
      "Only the owner of the bot can use this command."
    );
  });
});
