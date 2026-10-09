import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

/* How to use what's on a page: a heading and plain prose (paragraphs, lists,
   bold, code, and code blocks), styled here so pages can write bare HTML. */
export function Guidance({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box component="section">
      <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Box
        sx={{
          typography: "body2",
          maxWidth: "75ch",
          "& p": { m: 0, mb: 1.5 },
          "& ul, & ol": { m: 0, mb: 1.5, pl: 2.5 },
          "& li + li": { mt: 0.75 },
          "& strong": { color: "text.primary" },
          "& code": { fontFamily: "monospace", fontSize: "0.9em" },
          "& pre": {
            m: 0,
            mb: 1.5,
            p: 2,
            overflowX: "auto",
            fontSize: 13,
            lineHeight: 1.6,
            bgcolor: "background.paper",
            border: 1,
            borderColor: "divider",
            borderRadius: 1.5,
          },
          "& > :last-child": { mb: 0 },
          color: "text.secondary",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
