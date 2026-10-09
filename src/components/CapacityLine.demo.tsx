import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import { CodeBlock } from "../docs/CodeBlock";
import { Example } from "../docs/Example";
import { CapacityFigure } from "./CapacityFigure";
import { CapacityLine } from "./CapacityLine";

const calendar = <CalendarMonthOutlinedIcon sx={{ color: "text.secondary" }} />;

export function CapacityLineDemo() {
  return (
    <>
      <Example title="Every kind of line, on the figure's axis">
        <Stack sx={{ maxWidth: 280 }}>
          <Box sx={{ mb: 1 }}>
            <CapacityFigure units={2} />
          </Box>
          <CapacityLine
            icon={<FolderOutlinedIcon />}
            action
            menu
            onClick={() => {}}
            hint="Put it on a project so it can be scheduled."
          >
            Assign project
          </CapacityLine>
          <CapacityLine icon={<FolderOutlinedIcon />} menu onClick={() => {}}>
            Customer Portal
          </CapacityLine>
          <CapacityLine icon={<FolderOutlinedIcon sx={{ color: "text.disabled" }} />} muted>
            No project yet
          </CapacityLine>
          <CapacityLine
            icon={<PlayCircleOutlineRoundedIcon />}
            disabled
            hint="Assign a project first; the focus comes from its backlog."
          >
            Choose a focus
          </CapacityLine>
          <CapacityLine icon={calendar} action onClick={() => {}}>
            Schedule
          </CapacityLine>
          <CapacityLine icon={calendar}>Week of Oct 12</CapacityLine>
        </Stack>
      </Example>
      <CodeBlock
        code={`<CapacityBlock
  block={capacity.type}
  footer={
    capacity.week_starts_on ? (
      <CapacityLine icon={<CalendarMonthOutlinedIcon />}>{weekLabel(capacity.week_starts_on)}</CapacityLine>
    ) : (
      <CapacityLine
        icon={<CalendarMonthOutlinedIcon />}
        action
        disabled={!capacity.project_id}
        hint={capacity.project_id ? "Choose a week for it on the schedule." : "Assign a project first."}
        onClick={() => navigate(scheduleUrl(capacity))}
      >
        Schedule
      </CapacityLine>
    )
  }
>
  <CapacityPlacement project={project?.name ?? null} focus={focus?.name} upNext={next?.name} />
</CapacityBlock>`}
      />
    </>
  );
}
