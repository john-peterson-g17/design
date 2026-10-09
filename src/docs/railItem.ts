import type { Theme } from "@mui/material/styles";

/*
 * A rail row, copied from the portal's src/components/railItem.ts so this
 * page's nav looks like the portal's: compact, quiet at rest, and lit when
 * it's the current page — a soft blue wash with a glowing bar at its leading
 * edge, the way GitHub marks the current item.
 */
export const railItemSx = (theme: Theme) => {
  const blue = theme.vars.palette.primary.mainChannel;
  return {
    position: "relative",
    minHeight: 32,
    px: 1,
    py: 0.5,
    borderRadius: 1.5,
    transition: theme.transitions.create(["background-color", "color"], {
      duration: theme.transitions.duration.shortest,
    }),
    "& .MuiListItemIcon-root": { minWidth: 28 },
    "&:hover": { backgroundColor: theme.vars.palette.action.hover },
    /* Light wants a lighter wash than dark for the same presence. */
    "&.Mui-selected, &.Mui-selected:hover": {
      color: theme.vars.palette.text.primary,
      backgroundColor: "transparent",
      backgroundImage: `linear-gradient(90deg, rgba(${blue} / 10%), rgba(${blue} / 3%))`,
      boxShadow: `inset 0 0 0 1px rgba(${blue} / 10%)`,
      ...theme.applyStyles("dark", {
        backgroundImage: `linear-gradient(90deg, rgba(${blue} / 18%), rgba(${blue} / 4%))`,
        boxShadow: `inset 0 0 0 1px rgba(${blue} / 14%)`,
      }),
    },
    "&.Mui-selected .MuiListItemIcon-root": { color: theme.vars.palette.primary.main },
    "&.Mui-selected::before": {
      content: '""',
      position: "absolute",
      left: -8,
      top: 6,
      bottom: 6,
      width: 3,
      borderRadius: 3,
      backgroundColor: theme.vars.palette.primary.main,
      boxShadow: `0 0 6px rgba(${blue} / 45%)`,
      ...theme.applyStyles("dark", { boxShadow: `0 0 8px rgba(${blue} / 70%)` }),
    },
  } as const;
};
