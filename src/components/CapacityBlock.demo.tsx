import { useState } from "react";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { CodeBlock } from "../docs/CodeBlock";
import { Example } from "../docs/Example";
import { CAPACITY_BLOCK_IDS } from "./capacity";
import { CapacityBlock } from "./CapacityBlock";
import { CapacityLine } from "./CapacityLine";
import { CapacityPlacement } from "./CapacityPlacement";

const placement = (
  <CapacityPlacement project="Customer Portal" upNext="Invoice export" onFocusClick={() => {}} />
);

/*
 * A block's footer, as an app might draw it: its week once it has one, or
 * the way to schedule it, which waits, disabled, until it's on a project.
 */
export function When({ week, onProject = true }: { week?: string; onProject?: boolean }) {
  const icon = <CalendarMonthOutlinedIcon sx={{ color: "text.secondary" }} />;
  if (week) return <CapacityLine icon={icon}>{week}</CapacityLine>;
  return (
    <CapacityLine
      icon={icon}
      action
      disabled={!onProject}
      onClick={() => {}}
      hint={
        onProject
          ? "Choose a week for it on the schedule."
          : "Assign a project first; only blocks on a project can be scheduled."
      }
    >
      Schedule
    </CapacityLine>
  );
}

export function CapacityBlockDemo() {
  const [picked, setPicked] = useState<string | null>("core");
  return (
    <>
      <Example title="Each block, waiting for a week (click one to pick it)">
        <Grid container spacing={2}>
          {CAPACITY_BLOCK_IDS.map((id) => (
            <Grid key={id} size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <CapacityBlock
                block={id}
                selected={picked === id}
                onClick={() => setPicked(picked === id ? null : id)}
                footer={<When />}
              >
                {placement}
              </CapacityBlock>
            </Grid>
          ))}
        </Grid>
      </Example>
      <CodeBlock
        code={`<CapacityBlock
  block={capacity.type}
  selected={picked === capacity.id}
  onClick={() => pick(capacity.id)}
  footer={<When capacity={capacity} />}
>
  <CapacityPlacement project={project?.name ?? null} focus={focus?.name} upNext={next?.name} />
</CapacityBlock>`}
      />

      <Example title="On a schedule: scheduled, draggable, locked, and where one will land">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <CapacityBlock block="core" scheduled footer={<When week="Week of Oct 12" />}>
              {placement}
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="flex"
              onDragStart={() => {}}
              dragHint="Drag onto a week after this one to schedule it."
              badge={<Chip size="small" variant="outlined" label="Available" />}
            >
              {placement}
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="dedicated"
              scheduled
              locked="Its week has started, so it can't be changed."
              footer={<When week="This week" />}
            >
              <CapacityPlacement project="Customer Portal" focus="Invoice export" />
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <CapacityBlock block="flex" preview>
              <CapacityPlacement project="Customer Portal" upNext="Invoice export" />
            </CapacityBlock>
          </Grid>
        </Grid>
      </Example>
    </>
  );
}
