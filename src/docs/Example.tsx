import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

/* One labelled example on a component's page, on a faint dot grid so cards and
   other surfaces read against it. */
export function Example({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box sx={{ border: 1, borderColor: "divider", borderRadius: 2, overflow: "hidden" }}>
      <Box
        sx={{
          px: 2,
          py: 1,
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          {title}
        </Typography>
      </Box>
      <Box
        sx={(theme) => ({
          p: { xs: 2, sm: 3 },
          bgcolor: "background.default",
          backgroundImage: `radial-gradient(${theme.vars.palette.divider} 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        })}
      >
        {children}
      </Box>
    </Box>
  );
}
