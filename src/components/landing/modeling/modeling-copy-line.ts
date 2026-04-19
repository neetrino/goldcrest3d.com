const NON_BREAKING_SPACE = "\u00A0";
const TAB_AS_SPACES = "    ";

function preserveInlineWhitespace(value: string): string {
  return value.replace(/ +/g, (spaces, offset) => {
    const runLength = spaces.length;
    const runStart = offset;
    const runEnd = runStart + runLength;
    const isAtStart = runStart === 0;
    const isAtEnd = runEnd === value.length;

    if (runLength === 1 && !isAtStart && !isAtEnd) {
      return " ";
    }
    if (isAtStart || isAtEnd) {
      return NON_BREAKING_SPACE.repeat(runLength);
    }
    return ` ${NON_BREAKING_SPACE.repeat(runLength - 1)}`;
  });
}

export function renderModelingTitleText(value: string): string {
  const normalizedNewLines = value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const withExpandedTabs = normalizedNewLines.replace(/\t/g, TAB_AS_SPACES);
  return withExpandedTabs
    .split("\n")
    .map((line) => preserveInlineWhitespace(line))
    .join("\n");
}

export function renderModelingCopyLine(line: string): string {
  if (line.length === 0) {
    return NON_BREAKING_SPACE;
  }
  return renderModelingTitleText(line);
}
