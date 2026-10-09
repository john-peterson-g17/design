import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import { SectionCard, StatCard } from "../../components";
import { CodeBlock } from "../CodeBlock";
import { Example } from "../Example";
import { Rules } from "./Rules";

export function PagesGuideline() {
  return (
    <>
      <Rules
        title="Every page"
        items={[
          "Works on a phone from 360px wide up through desktop, and never scrolls sideways.",
          "Lays out with Grid, Stack and Container, with responsive sx values that start from xs and add for larger screens.",
          "Has no fixed width or height that can overflow a phone. Cap a width with maxWidth instead.",
          "Changes structure, not just styling, only through useMediaQuery(theme.breakpoints.down(…)).",
          "Turns persistent side navigation into a temporary Drawer below md, as this page does.",
          "Keeps touch targets at MUI's default sizes or larger.",
          "Is checked at 375px and at desktop width, in light and dark, before it's done. The phone preview at the top of each page here shows 375px.",
        ]}
      />

      <Example title="Cards stack on phones, two across from md">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionCard title="Billing details" subheader="Where invoices are sent.">
              <Typography variant="body2">Acme Corp · accounts@acme.example · Net 30</Typography>
            </SectionCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionCard title="Payment method" subheader="Charged on the 1st.">
              <Typography variant="body2">Visa ending 4242 · Expires 08/29</Typography>
            </SectionCard>
          </Grid>
        </Grid>
      </Example>
      <CodeBlock
        code={`<Grid container spacing={2}>
  <Grid size={{ xs: 12, md: 6 }}>…</Grid>
  <Grid size={{ xs: 12, md: 6 }}>…</Grid>
</Grid>`}
      />

      <Example title="Stats: one per row on phones, three across from sm">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard label="Hours available" value="38" icon={BoltOutlinedIcon} accent />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard label="Scheduled" value="24" icon={ScheduleOutlinedIcon} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard label="Outstanding" value="$0" icon={ReceiptLongOutlinedIcon} />
          </Grid>
        </Grid>
      </Example>
    </>
  );
}
