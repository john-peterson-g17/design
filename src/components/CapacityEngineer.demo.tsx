import Grid from "@mui/material/Grid";
import { CodeBlock } from "../docs/CodeBlock";
import { MARCUS, PRIYA } from "../docs/engineers";
import { Example } from "../docs/Example";
import { CapacityBlock } from "./CapacityBlock";
import { When } from "./CapacityBlock.demo";
import { CapacityEngineer } from "./CapacityEngineer";
import { CapacityPlacement } from "./CapacityPlacement";

const placement = <CapacityPlacement project="Customer Portal" upNext="Invoice export" />;

/* The app opens its own picker at the line; here, nothing. */
const pick = () => {};

export function CapacityEngineerDemo() {
  return (
    <>
      <Example title="In an admin view: assign one, or change who (hover the name)">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="core"
              footer={
                <>
                  <CapacityEngineer engineer={null} onAssignClick={pick} />
                  <When />
                </>
              }
            >
              {placement}
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="core"
              scheduled
              footer={
                <>
                  <CapacityEngineer engineer={PRIYA} onAssignClick={pick} />
                  <When week="Week of Oct 12" />
                </>
              }
            >
              {placement}
            </CapacityBlock>
          </Grid>
        </Grid>
      </Example>
      <CodeBlock
        code={`<CapacityBlock
  block={capacity.type}
  footer={
    <>
      <CapacityEngineer
        engineer={engineer && {
          name: engineer.name,
          level: engineer.level,
          avatarUrl: engineer.avatar_url,
          bio: engineer.bio,
          profileHref: \`/engineers/\${engineer.id}\`,
        }}
        onAssignClick={(anchor) => openEngineerPicker(anchor)}
      />
      <When capacity={capacity} />
    </>
  }
>
  <CapacityPlacement project={project?.name ?? null} focus={focus?.name} upNext={next?.name} />
</CapacityBlock>`}
      />

      <Example title="In a client's view: who, read-only (hover the name)">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="flex"
              footer={
                <>
                  <CapacityEngineer engineer={null} />
                  <When />
                </>
              }
            >
              {placement}
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="flex"
              scheduled
              footer={
                <>
                  <CapacityEngineer engineer={MARCUS} />
                  <When week="Week of Oct 12" />
                </>
              }
            >
              {placement}
            </CapacityBlock>
          </Grid>
        </Grid>
      </Example>
      <CodeBlock code={`<CapacityEngineer engineer={engineerProfile} />`} />
    </>
  );
}
