import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import type { DragEvent, KeyboardEvent, ReactNode } from "react";
import {
  CAPACITY_BLOCKS,
  ICON_COLUMN,
  ICON_GAP,
  capacitySize,
  type CapacityBlockId,
} from "./capacity";
import { CapacityDetails } from "./CapacityDetails";
import { CapacityFigure } from "./CapacityFigure";
import { DetailsPopover } from "./DetailsPopover";

export type CapacityBlockProps = {
  block: CapacityBlockId;
  /** What the block is on, under its size: its project and focus, from the app. */
  children?: ReactNode;
  /**
   * Pinned to the foot over a hairline: who works on it (CapacityEngineer) and
   * when, or the way to schedule it, as CapacityLines so its icons line up
   * with the figure.
   */
  footer?: ReactNode;
  /** Beside the name, such as the app's status chip for it. */
  badge?: ReactNode;
  /** In its week on a schedule: tinted and edged in primary, like a calendar event. */
  scheduled?: boolean;
  /** Picked, to act on it: outlined in primary. */
  selected?: boolean;
  /** The outline of where a block being moved will land: dashed, and does nothing itself. */
  preview?: boolean;
  /** Being dragged away from where it shows. */
  faded?: boolean;
  /** Why it can't be moved yet, said on hover over a lock where the drag handle would be. */
  locked?: string;
  /** Makes the whole card a button. Clicks in `children` and `footer` stay there. */
  onClick?: () => void;
  /** Makes it draggable, with a handle. Put what's being moved on `event.dataTransfer`. */
  onDragStart?: (event: DragEvent<HTMLElement>) => void;
  onDragEnd?: () => void;
  /** What dragging it does, said on the handle, e.g. "Drag onto a week to schedule it." */
  dragHint?: string;
};

const handle = { fontSize: 18, color: "text.secondary", mt: 0.25 } as const;

/*
 * A capacity block as a card, the same wherever it is: waiting for a week,
 * in its week on a schedule, or being moved, so a block always looks like
 * itself. Its figure, its name, which opens CapacityDetails, and its size in
 * words, then what the app says it's on and when. One card per block, never
 * one for several.
 */
export function CapacityBlock({
  block,
  children,
  footer,
  badge,
  scheduled = false,
  selected = false,
  preview = false,
  faded = false,
  locked,
  onClick,
  onDragStart,
  onDragEnd,
  dragHint,
}: CapacityBlockProps) {
  const { name, units } = CAPACITY_BLOCKS[block];
  const highlighted = selected || preview;
  const draggable = !preview && Boolean(onDragStart);
  const clickable = !preview && Boolean(onClick);
  const interactive = draggable || clickable;

  return (
    <Box
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-pressed={clickable ? selected : undefined}
      aria-hidden={preview || undefined}
      draggable={draggable}
      onClick={clickable ? onClick : undefined}
      onKeyDown={(event: KeyboardEvent) => {
        if (!clickable || event.target !== event.currentTarget) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        onClick?.();
      }}
      onDragStart={(event: DragEvent<HTMLElement>) => {
        event.dataTransfer.effectAllowed = "move";
        onDragStart?.(event);
      }}
      onDragEnd={() => onDragEnd?.()}
      sx={(theme) => {
        const tint = (alpha: number) =>
          `rgba(${theme.vars.palette.primary.mainChannel} / ${alpha})`;
        return {
          display: "flex",
          gap: 1,
          width: "100%",
          boxSizing: "border-box",
          p: 1.5,
          textAlign: "left",
          color: "text.primary",
          border: 1,
          borderStyle: preview ? "dashed" : "solid",
          borderRadius: 1,
          borderColor: highlighted ? "primary.main" : scheduled ? tint(0.4) : "divider",
          bgcolor: highlighted ? "action.selected" : scheduled ? tint(0.14) : "background.paper",
          ...(scheduled && { borderLeft: 4, borderLeftColor: "primary.main" }),
          boxShadow: selected ? `inset 0 0 0 1px ${theme.vars.palette.primary.main}` : "none",
          opacity: faded ? 0.4 : 1,
          pointerEvents: preview ? "none" : "auto",
          cursor: draggable ? "grab" : clickable ? "pointer" : locked ? "not-allowed" : "default",
          transition: "border-color 120ms, background-color 120ms, opacity 120ms",
          "&:hover":
            highlighted || !interactive
              ? {}
              : scheduled
                ? { bgcolor: tint(0.22), borderColor: "primary.main" }
                : { borderColor: "text.secondary" },
          "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
        };
      }}
    >
      {preview ? (
        <DragIndicatorRoundedIcon sx={handle} />
      ) : draggable ? (
        <Tooltip title={dragHint ?? ""} describeChild>
          <DragIndicatorRoundedIcon sx={handle} />
        </Tooltip>
      ) : locked ? (
        <Tooltip title={locked} describeChild>
          <LockOutlinedIcon sx={{ fontSize: 16, color: "text.disabled", mt: 0.25 }} />
        </Tooltip>
      ) : null}
      <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 1 }}>
        {/* The figure, its name and size, then the badge in a column of its own, so it
            never sits over the size and the text stops short of it. */}
        <Box sx={{ display: "flex", alignItems: "center", gap: ICON_GAP }}>
          <CapacityFigure units={units} size={ICON_COLUMN * 2} />
          <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 0.25 }}>
            <Box sx={{ display: "flex", minWidth: 0 }}>
              <DetailsPopover title={<CapacityDetails block={block} />}>
                <Typography
                  variant="subtitle2"
                  component="span"
                  noWrap
                  tabIndex={preview ? undefined : 0}
                  sx={{
                    borderRadius: 0.5,
                    cursor: "help",
                    "&:focus-visible": {
                      outline: 2,
                      outlineColor: "primary.main",
                      outlineOffset: 2,
                    },
                  }}
                >
                  {name} block
                </Typography>
              </DetailsPopover>
            </Box>
            <Typography variant="caption" component="span" sx={{ color: "text.secondary" }}>
              {capacitySize(units)}
            </Typography>
          </Box>
          {badge ? <Box sx={{ flex: "none", display: "flex" }}>{badge}</Box> : null}
        </Box>
        {children || footer ? (
          <Box
            onClick={clickable ? (event) => event.stopPropagation() : undefined}
            onKeyDown={clickable ? (event) => event.stopPropagation() : undefined}
            sx={{ display: "flex", flexDirection: "column", gap: 1, flex: 1, minWidth: 0 }}
          >
            {children}
            {footer ? (
              <Box
                sx={{ mt: "auto", pt: 1, borderTop: 1, borderColor: "divider", cursor: "default" }}
              >
                {footer}
              </Box>
            ) : null}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
