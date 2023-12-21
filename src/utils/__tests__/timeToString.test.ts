import { timeToString } from "../timeToString";

describe("convert hours into days and hours, used in Admin Event Form", () => {
  it("returns 1 hour if no input or 0-1 hours", () => {
    const undefinedResult = timeToString();
    const zeroHours = timeToString(0);
    const oneHour = timeToString(1);

    expect(undefinedResult).toBe("1 hour");
    expect(zeroHours).toBe("1 hour");
    expect(oneHour).toBe("1 hour");
  });

  it("returns its original value + 'hours' if less than 24h", () => {
    const twelveHours = timeToString(12);
    const twentyHours = timeToString(20);

    expect(twelveHours).toBe(`12 hours`);
    expect(twentyHours).toBe("20 hours");
  });

  it("returns days + remaining hours if more than 24h", () => {
    const twentyFourHours = timeToString(24);
    const thirtyHours = timeToString(30);
    const fiftyHours = timeToString(50);
    const fortyNineHours = timeToString(49);

    expect(twentyFourHours).toBe(`1 day`);
    expect(thirtyHours).toBe(`1 day 6 hours`);
    expect(fiftyHours).toBe("2 days 2 hours");
    expect(fortyNineHours).toBe("2 days 1 hour");
  });
});
