const { extractCommandFromMessage } = require("../../src/utils/commandUtils");

require("dotenv").config({ path: "./config/.env" });

const PREFIX = process.env.PREFIX;

describe("extractCommandFromMessage function", () => {
  test("should correctly parse command name and arguments", () => {
    const message = { content: `${PREFIX}test arg1 arg2` };
    const result = extractCommandFromMessage(message, PREFIX);
    expect(result).toEqual({
      commandName: "test",
      args: ["arg1", "arg2"],
    });
  });

  test("should correctly handle commands with empty arguments", () => {
    const message = { content: `${PREFIX}test ` };
    const result = extractCommandFromMessage(message, PREFIX);
    expect(result).toEqual({
      commandName: "test",
      args: [],
    });
  });
});
