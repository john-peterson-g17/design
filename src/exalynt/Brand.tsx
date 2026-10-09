import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Mark } from "./Mark";

export type BrandProps = {
  product?: string;
  compact?: boolean;
};

/**
 * Wordmark lockup, matching the site's .brand: mark, 10px gap, tracked caps,
 * and the tool's name as a badge (PORTAL, CONSOLE, ADMIN).
 *
 * It renders no link of its own; wrap it in the app's router link.
 *
 * `compact` drops the product badge below sm, where a phone's top bar has to
 * fit the menu button and account controls beside it.
 */
export function Brand({ product, compact = false }: BrandProps) {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        whiteSpace: "nowrap",
        color: "text.primary",
      }}
    >
      <Mark sx={{ fontSize: 22 }} />
      <Typography
        component="span"
        sx={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.1em", lineHeight: 1 }}
      >
        EXALYNT
      </Typography>
      {product ? (
        <Typography
          component="span"
          sx={{
            display: compact ? { xs: "none", sm: "inline" } : "inline",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            lineHeight: 1,
            textTransform: "uppercase",
            px: 0.75,
            py: 0.5,
            borderRadius: 0.5,
            color: "primary.main",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
          }}
        >
          {product}
        </Typography>
      ) : null}
    </Box>
  );
}
