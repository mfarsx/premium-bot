const { parseCommand } = require("../src/utils");
require("dotenv").config({ path: "./config/.env" });

const PREFIX = process.env.PREFIX;

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
