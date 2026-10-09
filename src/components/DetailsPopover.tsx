import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import type { ReactElement, ReactNode } from "react";

const cleared = {
  padding: 0,
  maxWidth: "none",
  backgroundColor: "transparent",
  border: 0,
  boxShadow: "none",
};

/*
 * The popover a stability mark or a maturity opens on hover, focus, or tap.
 * Its content draws its own card (DetailsCard), so the tooltip's is cleared.
 */
export function DetailsPopover({ title, children }: { title: ReactNode; children: ReactElement }) {
  return (
    <Tooltip
      describeChild
      enterTouchDelay={0}
      leaveTouchDelay={8000}
      title={title}
      slotProps={{
        tooltip: {
          /* Cleared in dark too: a theme's dark tooltip styles (Exalynt's
             included) sit behind a more specific selector than plain sx, and
             would draw the tooltip's own box around the card's corners. */
          sx: (theme) => ({ ...cleared, ...theme.applyStyles("dark", cleared) }),
        },
      }}
    >
      {children}
    </Tooltip>
  );
}

/* The popover's card, or with `card={false}` just its text, for a card of your own. */
export function DetailsCard({ card, children }: { card: boolean; children: ReactNode }) {
  return (
    <Box
      sx={[
        {
          boxSizing: "border-box",
          fontSize: card ? 12.5 : 14,
          fontWeight: 400,
          lineHeight: 1.5,
          textAlign: "left",
          color: "text.primary",
        },
        card && {
          width: 300,
          maxWidth: "calc(100vw - 24px)",
          px: 2,
          py: 1.75,
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: 2.5,
          boxShadow: 8,
        },
      ]}
    >
      {children}
    </Box>
  );
}

/* The small uppercase line a popover opens with. */
export function DetailsEyebrow({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        fontSize: "0.84em",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "text.secondary",
      }}
    >
      {children}
    </Box>
  );
}

/* A popover's closing link to the readme: an ordinary link, in the theme's link color and
   underlined, opening in a new tab so the reader keeps their place. */
export function DetailsLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      underline="always"
      sx={{
        display: "inline-block",
        mt: 1.5,
        fontSize: "0.92em",
        fontWeight: 500,
        textUnderlineOffset: 2,
      }}
    >
      {children} ↗
    </Link>
  );
}
