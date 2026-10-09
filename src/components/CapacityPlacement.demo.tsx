import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { CodeBlock } from "../docs/CodeBlock";
import { Example } from "../docs/Example";
import { CapacityBlock } from "./CapacityBlock";
import { When } from "./CapacityBlock.demo";
import { CapacityPlacement } from "./CapacityPlacement";

const available = <Chip size="small" variant="outlined" label="Available" />;

/* The app opens its own picker at the line; here, nothing. */
const pick = () => {};

export function CapacityPlacementDemo() {
  return (
    <>
      <Example title="From no project to a focus of its own (hover a line)">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock block="core" badge={available} footer={<When onProject={false} />}>
              <CapacityPlacement project={null} onProjectClick={pick} />
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock block="core" badge={available} footer={<When />}>
              <CapacityPlacement
                project="Customer Portal"
                upNext="Invoice export"
                onProjectClick={pick}
                onFocusClick={pick}
              />
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock block="core" badge={available} footer={<When />}>
              <CapacityPlacement
                project="Customer Portal"
                focus="Invoice export"
                focusIcon={<AutoAwesomeOutlinedIcon sx={{ color: "primary.main" }} />}
                onProjectClick={pick}
                onFocusClick={pick}
              />
            </CapacityBlock>
          </Grid>
        </Grid>
      </Example>
      <CodeBlock
        code={`<CapacityPlacement
  project={project?.name ?? null}
  focus={focus?.name}
  focusIcon={focus && <TypeIcon type={focus.type} />}
  upNext={upNext?.name}
  onProjectClick={(anchor) => openProjectPicker(anchor)}
  onFocusClick={(anchor) => openFocusPicker(anchor)}
/>`}
      />

      <Example title="Read-only, where it can't be changed here">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock block="flex">
              <CapacityPlacement project={null} />
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock block="flex">
              <CapacityPlacement project="Customer Portal" />
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock block="flex" locked="Exalynt is working on it, so it can't be changed.">
              <CapacityPlacement project="Customer Portal" focus="Invoice export" />
            </CapacityBlock>
          </Grid>
        </Grid>
      </Example>
    </>
  );
}
