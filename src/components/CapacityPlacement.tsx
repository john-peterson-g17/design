import Box from "@mui/material/Box";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import type { ReactNode } from "react";
import { CapacityLine } from "./CapacityLine";

export type CapacityPlacementProps = {
  /** The project's name, or null while the block is on none. */
  project: string | null;
  /** What on the project's backlog it's kept on, or null to follow whatever is first in Up next. */
  focus?: string | null;
  /** The focus's icon in its color, such as its Feature or bug icon. */
  focusIcon?: ReactNode;
  /** What's first in Up next now, shown after "Up next" while it has no focus of its own. */
  upNext?: string;
  /** Opens the app's project picker at the line. Without it, the line is read-only. */
  onProjectClick?: (anchor: HTMLElement) => void;
  /** Opens the app's focus picker at the line. Without it, the line is read-only. */
  onFocusClick?: (anchor: HTMLElement) => void;
};

const UP_NEXT_HINT =
  "No Feature or bug chosen, so it goes to whatever is first in Up next on the project's backlog, even as that changes.";

/*
 * Where a block goes, as two CapacityLines for CapacityBlock's children: the project
 * it's on, then what it goes towards there. A block on no project asks to be
 * assigned one, or says it has none where it can't be, and holds the focus
 * line's place, disabled, so assigning one doesn't resize the card. A block
 * on a project with no focus of its own follows Up next, which is a choice,
 * not something missing. Names are cut short rather than stretching the
 * card, and each line says in full what it is on hover.
 */
export function CapacityPlacement({
  project,
  focus = null,
  focusIcon,
  upNext,
  onProjectClick,
  onFocusClick,
}: CapacityPlacementProps) {
  const change = (what: string, editable: boolean) => (editable ? ` Click to ${what}.` : "");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
      {project ? (
        <CapacityLine
          icon={<FolderOutlinedIcon />}
          hint={`${project}: the project this block's work goes to.${change("move it", Boolean(onProjectClick))}`}
          onClick={onProjectClick}
          menu={Boolean(onProjectClick)}
        >
          {project}
        </CapacityLine>
      ) : onProjectClick ? (
        <CapacityLine
          icon={<FolderOutlinedIcon />}
          action
          menu
          hint="Put it on a project so it can be scheduled."
          onClick={onProjectClick}
        >
          Assign project
        </CapacityLine>
      ) : (
        <CapacityLine icon={<FolderOutlinedIcon sx={{ color: "text.disabled" }} />} muted>
          No project yet
        </CapacityLine>
      )}

      {!project ? (
        <CapacityLine
          icon={<PlayCircleOutlineRoundedIcon />}
          disabled
          hint="Assign a project first; the focus comes from its backlog."
        >
          Choose a focus
        </CapacityLine>
      ) : focus ? (
        <CapacityLine
          icon={focusIcon ?? <PlayCircleOutlineRoundedIcon />}
          hint={`${focus}: what this block goes towards.${change("change it, or follow Up next instead", Boolean(onFocusClick))}`}
          onClick={onFocusClick}
          menu={Boolean(onFocusClick)}
        >
          {focus}
        </CapacityLine>
      ) : (
        <CapacityLine
          icon={<PlayCircleOutlineRoundedIcon sx={{ color: "primary.main" }} />}
          hint={`${UP_NEXT_HINT}${change("keep it on one Feature or bug instead", Boolean(onFocusClick))}`}
          onClick={onFocusClick}
          menu={Boolean(onFocusClick)}
        >
          <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
            Up next
          </Box>
          {upNext ? (
            <Box component="span" sx={{ color: "text.secondary" }}>
              {" · "}
              {upNext}
            </Box>
          ) : null}
        </CapacityLine>
      )}
    </Box>
  );
}
