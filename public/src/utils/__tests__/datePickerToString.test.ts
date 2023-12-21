import { datePickerToString } from "../datePickerToString";

describe("converts date from date picker into DD-MM-YYYY HH:MM, used in Events Admin", () => {
  it("returns 01-01-1970 if no date is supplied", () => {
    const undefinedResult = datePickerToString();

    expect(undefinedResult).toBe("01-01-1970 00:00");
  });

  it("returns correct date for the string format supplied", () => {
    const resultFromDatepicker = datePickerToString("2024-12-23T10:22");

    expect(resultFromDatepicker).toBe("23-12-2024 10:22");
  });

  it("pads dates with zeros if the UTC month or hours or minutes are less than 10", () => {
    const resultFromDatepicker = datePickerToString("2024-1-2T10:22");

    expect(resultFromDatepicker).toBe("02-01-2024 10:22");
  });
});
