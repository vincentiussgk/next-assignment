export const trimString = (text: string, maxLength: number) => {
  if (!text) return "";
  text = text.toString();
  let modText = text.trim();

  if (modText.length > maxLength) {
    modText = text.substring(0, maxLength - 3);
    modText = modText.padEnd(maxLength, ".");

    return modText;
  }

  return text;
};
