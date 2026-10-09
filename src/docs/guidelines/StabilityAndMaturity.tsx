import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MaturityRing, StabilityMark } from "../../components";
import { Example } from "../Example";
import { Guidance } from "../Guidance";
import { ReadmeLink } from "../ReadmeLink";

const ROWS: [string, string, string][] = [
  [
    "Answers",
    "How stable is this, and how far can I rely on it today?",
    "How far along is this Feature or project, across all its Capabilities?",
  ],
  [
    "Belongs to",
    "Each Capability, or a Feature or page with one overall level.",
    "A Feature, from its Capabilities' levels, or a project, from its Features'.",
  ],
  [
    "Shown as",
    "One of four levels by name: StabilityMark, the Track and the level's name. Never a percentage.",
    "Always a percentage: MaturityRing, always a ring, never a bar or boxes.",
  ],
  [
    "Used in",
    "Everywhere, and above all in client projects, where it sets their users' expectations. Also in Exalynt's tools and the readme.",
    "Mostly Exalynt's own tools, the portal above all, so clients can follow progress on their projects, Features, and Capabilities. Not in client products.",
  ],
  ["Helps people", "Decide what to rely on.", "See progress over time."],
];

/* How stability and maturity differ, on both guides so neither is read alone. */
export function StabilityAndMaturity() {
  return (
    <>
      <Guidance title="Stability and maturity">
        <p>
          They&rsquo;re related, and use the same four colors, but they answer different questions
          for different people. Never show one in place of the other.
        </p>
        <ul>
          <li>
            <strong>Stability</strong> sets expectations: how much something will still change, and
            how far it can be relied on today. It&rsquo;s used everywhere, especially in client
            projects, on the thing that has the level.
          </li>
          <li>
            <strong>Maturity</strong> shows progress: how far along a Feature or a project is, as a
            percentage worked out from its Capabilities&rsquo; stability. It&rsquo;s used mostly in
            Exalynt&rsquo;s own tools, so clients have a good picture of how their projects,
            Features, and Capabilities are coming along.
          </li>
          <li>
            <strong>Maturity is shown with a percentage; stability never is.</strong> A level is one
            of four names, never &ldquo;75%&rdquo; or a progress bar. The 25% a level counts for is
            only how maturity is worked out, and never shown on a level.
          </li>
          <li>
            <strong>Before relying on something, check its stability,</strong> not the maturity
            around it. A project can be 80% mature with the one Capability you need still at Alpha.
          </li>
        </ul>
        <p>
          The readme explains{" "}
          <ReadmeLink path="how-it-works/stability-levels">what each level means</ReadmeLink> and{" "}
          <ReadmeLink path="how-it-works/maturity#maturity-status-stability-and-bugs">
            how maturity, status, and stability differ
          </ReadmeLink>{" "}
          for clients.
        </p>
      </Guidance>
      <Example title="Side by side">
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  Stability <StabilityMark level="beta" link={false} />
                </TableCell>
                <TableCell>
                  Maturity <MaturityRing progress={67} subject="feature" size={20} link={false} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ROWS.map(([label, stability, maturity]) => (
                <TableRow key={label}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                    {label}
                  </TableCell>
                  <TableCell>{stability}</TableCell>
                  <TableCell>{maturity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Example>
    </>
  );
}
