import Stack from "@mui/material/Stack";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import { Example } from "../Example";

const VARIANTS: NonNullable<TypographyProps["variant"]>[] = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "subtitle1",
  "subtitle2",
  "body1",
  "body2",
  "caption",
  "overline",
  "button",
];

export function TypographyDemo() {
  return (
    <Example title="Scale">
      <Stack spacing={2}>
        {VARIANTS.map((variant) => (
          <Stack key={variant} spacing={0.25}>
            <Typography variant="caption" sx={{ color: "text.secondary", fontFamily: "monospace" }}>
              {variant}
            </Typography>
            {/* h1 at 52px would overflow a phone on one line. */}
            <Typography variant={variant} sx={{ display: "block", overflowWrap: "anywhere" }}>
              Engineering capacity, on demand
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Example>
  );
}
