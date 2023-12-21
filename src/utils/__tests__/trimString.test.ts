import { trimString } from "../trimString";

describe("trim string", () => {
  it("returns nothing if given no parameters", () => {
    const input = "";

    const result = trimString(input, 0);

    expect(result).toBe("");
  });

  it("trims the end of a string given max length", () => {
    const input = "The seventh word will be trimmed hello hello";
    const result = trimString(input, 35);

    expect(result).toBe("The seventh word will be trimmed...");
  });

  it("returns original text if it doesn't exceed max length", () => {
    const input = "Returns original string.";
    const result = trimString(input, 50);

    expect(result).toBe("Returns original string.");
  });
});
