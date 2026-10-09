import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Example } from "../Example";

const ROLES = [
  "primary.main",
  "secondary.main",
  "success.main",
  "warning.main",
  "error.main",
  "info.main",
  "text.primary",
  "text.secondary",
  "background.default",
  "background.paper",
  "divider",
  /* Exalynt's own roles (see src/exalynt/theme.ts); a client's theme won't have them. */
  "lead.main",
  "chrome",
];

function Swatch({ role }: { role: string }) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          flexShrink: 0,
          borderRadius: 1,
          border: 1,
          borderColor: "divider",
          bgcolor: role,
        }}
      />
      <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
        {role}
      </Typography>
    </Stack>
  );
}

export function PaletteDemo() {
  return (
    <Example title="Roles">
      <Grid container spacing={2}>
        {ROLES.map((role) => (
          <Grid key={role} size={{ xs: 12, sm: 6, md: 4 }}>
            <Swatch role={role} />
          </Grid>
        ))}
      </Grid>
    </Example>
  );
}
