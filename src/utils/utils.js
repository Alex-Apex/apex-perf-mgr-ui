function toTitleCase(snakeCaseString) {
  // Step 1: Replace all underscores with spaces
  const stringWithSpaces = snakeCaseString.replace(/_/g, ' ');

  // Step 2: Convert to title case (first letter of each word capitalized)
  const titleCaseString = stringWithSpaces.replace(/\b\w/g, char => char.toUpperCase());

  return titleCaseString;
}

export {
  toTitleCase
};

