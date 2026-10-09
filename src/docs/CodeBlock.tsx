import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import type { Theme } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { highlightLine } from "./highlight";

const MONO =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

/* Code sits a step darker than the cards around it: the page's own surface in
   light, the chrome's deeper one in dark. */
const codeSurface = (theme: Theme) => ({
  backgroundColor: theme.vars.palette.background.default,
  ...theme.applyStyles("dark", { backgroundColor: theme.vars.palette.chrome }),
});

function useCopy(code: string) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return { copied, copy };
}

/*
 * A highlighted snippet. One line (an import) is a compact bar with a copy
 * button at its end; more lines get a header with the language and a copy
 * button, and line numbers. Long lines scroll sideways inside the block, so
 * the page doesn't on a phone.
 */
export function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  const { copied, copy } = useCopy(code);
  const lines = code.split("\n");
  const copyIcon = copied ? (
    <CheckIcon sx={{ fontSize: 16 }} />
  ) : (
    <ContentCopyOutlinedIcon sx={{ fontSize: 16 }} />
  );

  if (lines.length === 1) {
    return (
      <Box
        sx={[
          codeSurface,
          {
            display: "flex",
            alignItems: "center",
            gap: 1,
            pl: 2,
            pr: 0.5,
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
          },
        ]}
      >
        <Box
          component="code"
          sx={{
            flex: 1,
            minWidth: 0,
            py: 1.25,
            overflowX: "auto",
            whiteSpace: "pre",
            fontFamily: MONO,
            fontSize: 13,
          }}
        >
          {highlightLine(code)}
        </Box>
        <Tooltip title={copied ? "Copied" : "Copy"}>
          <IconButton size="small" onClick={copy} aria-label="Copy the code">
            {copyIcon}
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box sx={{ border: 1, borderColor: "divider", borderRadius: 2, overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pl: 2,
          pr: 1,
          py: 0.5,
          bgcolor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Typography
          variant="caption"
          sx={{ fontFamily: MONO, color: "text.secondary", letterSpacing: "0.04em" }}
        >
          {language}
        </Typography>
        <Button
          size="small"
          onClick={copy}
          startIcon={copyIcon}
          sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </Box>
      <Box sx={[codeSurface, { overflowX: "auto", py: 1.5 }]}>
        <Box
          component="pre"
          sx={{
            m: 0,
            minWidth: "max-content",
            fontFamily: MONO,
            fontSize: 13,
            lineHeight: 1.7,
          }}
        >
          <code>
            {lines.map((line, index) => (
              <Box key={index} sx={{ display: "flex", pr: 2 }}>
                <Box
                  component="span"
                  aria-hidden
                  sx={{
                    flexShrink: 0,
                    boxSizing: "content-box",
                    width: "2ch",
                    pl: 2,
                    pr: 2,
                    textAlign: "right",
                    color: "text.disabled",
                    userSelect: "none",
                  }}
                >
                  {index + 1}
                </Box>
                <span>{highlightLine(line)}</span>
              </Box>
            ))}
          </code>
        </Box>
      </Box>
    </Box>
  );
}
