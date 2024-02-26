const { parseCommand } = require("../src/utils");
const { PREFIX } = require("../config/config");

describe("parseCommand function", () => {
  test("should correctly parse command name and arguments", () => {
    const msg = { content: `${PREFIX}test arg1 arg2` };
    const result = parseCommand(msg);
    expect(result).toEqual({
      commandName: "test",
      args: ["arg1", "arg2"],
    });
  });

  test("should return null for non-command messages", () => {
    const msg = { content: "This is not a command" };
    const result = parseCommand(msg);
    expect(result).toBeNull();
  });
});
