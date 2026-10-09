import Box from "@mui/material/Box";
import type { ReactNode } from "react";

/*
 * Just enough TSX highlighting for this page's snippets: comments, strings,
 * JSX tags, props, keywords, numbers and capitalized names (components and
 * types). It works a line at a time, so a string or comment spanning lines
 * isn't colored past its first line; no snippet here has one. Colors are
 * palette roles, so they follow the mode like everything else.
 */
const TOKEN = new RegExp(
  [
    String.raw`(?<comment>\/\/.*|\/\*.*?\*\/)`,
    String.raw`(?<string>"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|` + "`(?:[^`\\\\]|\\\\.)*`)",
    String.raw`(?<tag>(?<=<\/?)[A-Za-z][\w.]*)`,
    String.raw`(?<prop>\b[a-zA-Z][\w-]*(?==[^=]))`,
    String.raw`(?<keyword>\b(?:import|from|export|const|let|return|function|type|as|if|else|true|false|null|undefined|new)\b)`,
    String.raw`(?<number>\b\d+(?:\.\d+)?\b)`,
    String.raw`(?<name>\b[A-Z]\w*\b)`,
  ].join("|"),
  "g",
);

const STYLES = {
  comment: { color: "text.secondary", fontStyle: "italic" },
  string: { color: "success.main" },
  tag: { color: "primary.main" },
  prop: { color: "warning.main" },
  keyword: { color: "lead.main" },
  number: { color: "warning.main" },
  name: { color: "primary.main" },
} as const;

export function highlightLine(line: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of line.matchAll(TOKEN)) {
    const kind = Object.keys(STYLES).find((key) => match.groups?.[key] !== undefined) as
      keyof typeof STYLES | undefined;
    if (!kind) continue;
    if (match.index > last) parts.push(line.slice(last, match.index));
    parts.push(
      <Box key={match.index} component="span" sx={STYLES[kind]}>
        {match[0]}
      </Box>,
    );
    last = match.index + match[0].length;
  }
  if (last < line.length) parts.push(line.slice(last));
  return parts;
}
