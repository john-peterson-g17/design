import { Fragment, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import {
  STABILITY_LEVELS,
  StabilityDetails,
  StabilityMark,
  type StabilityLevelId,
  type StabilityMarkSize,
} from "../../components";
import { brand } from "../../exalynt";
import { CodeBlock } from "../CodeBlock";
import { Example } from "../Example";
import { Guidance } from "../Guidance";
import { ReadmeLink } from "../ReadmeLink";
import { StabilityAndMaturity } from "./StabilityAndMaturity";

const SIZES: { size: StabilityMarkSize; name: string; shows: string; use: string }[] = [
  {
    size: "short",
    name: "Short",
    shows: "The Track",
    use: "Tight spots where a name won't fit: navigation tabs, menu items, buttons, and tallies where a count and name follow. The level's name is its accessible label.",
  },
  {
    size: "long",
    name: "Long",
    shows: "The Track and the name",
    use: "The default. Beside a Capability's name in lists and tables, in a Stability column, and in running text.",
  },
  {
    size: "extra-long",
    name: "Extra long",
    shows: "The Track, the name, and how stable it is",
    use: "Beside the title of the page or Feature it describes, usually once per page, and in headings and legends that explain the levels.",
  },
];

/* The surfaces each shade is checked on: Exalynt's page and card, per scheme. */
const SURFACES = {
  light: [brand.white, brand.cloud],
  dark: [brand.midnight, brand.elevated],
};

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/* The lowest WCAG contrast of `color` across `surfaces`, e.g. "5.4:1". */
function contrast(color: string, surfaces: string[]) {
  const ratios = surfaces.map((surface) => {
    const [hi, lo] = [luminance(color), luminance(surface)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
  });
  return `${Math.min(...ratios).toFixed(1)}:1`;
}

function Swatch({ color, surfaces }: { color: string; surfaces: string[] }) {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
      <Box
        sx={{
          width: 14,
          height: 14,
          borderRadius: 0.75,
          border: 1,
          borderColor: "divider",
          bgcolor: color,
        }}
      />
      <Box component="code" sx={{ fontFamily: "monospace", fontSize: 13 }}>
        {color}
      </Box>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {contrast(color, surfaces)}
      </Typography>
    </Box>
  );
}

/* A product window, small: a bar of tabs over a body. */
function Mockup({
  caption,
  brandName,
  tabs,
  children,
}: {
  caption: ReactNode;
  brandName: string;
  tabs: { name: string; level?: StabilityLevelId; on?: boolean }[];
  children: ReactNode;
}) {
  return (
    <Box component="figure" sx={{ m: 0, display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography component="figcaption" variant="caption" sx={{ color: "text.secondary" }}>
        {caption}
      </Typography>
      <Paper variant="outlined" sx={{ overflow: "hidden", fontSize: 13 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "6px 16px",
            px: 2,
            py: 1.25,
            color: "text.secondary",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Box component="strong" sx={{ color: "text.primary" }}>
            {brandName}
          </Box>
          {tabs.map((tab) => (
            <Box
              key={tab.name}
              component="span"
              sx={[
                { display: "inline-flex", alignItems: "center", gap: 0.75 },
                !!tab.on && { fontWeight: 600, color: "text.primary" },
              ]}
            >
              {tab.name}
              {tab.level ? (
                <StabilityMark level={tab.level} feature={tab.name} size="short" />
              ) : null}
            </Box>
          ))}
        </Box>
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>{children}</Box>
      </Paper>
    </Box>
  );
}

function Row({ children, head = false }: { children: ReactNode; head?: boolean }) {
  return (
    <Box
      sx={[
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
          p: 1,
          borderBottom: 1,
          borderColor: "divider",
          "&:last-child": { borderBottom: 0 },
        },
        head && {
          py: 0.75,
          fontSize: 10.5,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "text.secondary",
        },
      ]}
    >
      {children}
    </Box>
  );
}

const PRODUCT_CAPABILITIES: [string, StabilityLevelId, string][] = [
  ["Monthly rollup", "ga", "12,480"],
  ["Seasonal adjustment", "beta", "3,212"],
  ["Scenario compare", "alpha", "418"],
  ["Natural-language query", "prototype", "36"],
];

const CLIENT_FEATURES: [string, [string, StabilityLevelId][]][] = [
  [
    "Revenue forecast",
    [
      ["Monthly rollup", "ga"],
      ["Seasonal adjustment", "beta"],
      ["Scenario compare", "alpha"],
    ],
  ],
  ["Assistant", [["Natural-language query", "prototype"]]],
];

/* The mark in two products: one for end users, where GA shows nothing, and
   the client app, where clients review every Capability, GA included. */
function InContext() {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Mockup
          caption="In the product, for end users. GA shows nothing."
          brandName="Northwind Ops"
          tabs={[
            { name: "Overview" },
            { name: "Forecasts", level: "beta", on: true },
            { name: "Routing", level: "alpha" },
            { name: "Assistant", level: "prototype" },
          ]}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px" }}>
            <Typography variant="h5" component="span">
              Revenue forecast
            </Typography>
            <StabilityMark level="beta" feature="Revenue forecast" size="extra-long" />
          </Box>
          <Box>
            <Row head>
              <span>Capability</span>
              <span>Runs (30d)</span>
            </Row>
            {PRODUCT_CAPABILITIES.map(([name, level, runs]) => (
              <Row key={name}>
                <Box
                  component="span"
                  sx={{ display: "inline-flex", flexWrap: "wrap", alignItems: "center", gap: 1 }}
                >
                  {name}
                  {level !== "ga" ? <StabilityMark level={level} feature={name} /> : null}
                </Box>
                <Box component="span" sx={{ color: "text.secondary" }}>
                  {runs}
                </Box>
              </Row>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Button size="small" variant="contained">
              Export forecast
            </Button>
            <Button size="small" variant="outlined">
              Compare scenarios{" "}
              <StabilityMark
                level="alpha"
                feature="Scenario compare"
                size="short"
                focusable={false}
              />
            </Button>
          </Box>
        </Mockup>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Mockup
          caption="In the client app, for clients reviewing work. GA shows."
          brandName="Exalynt"
          tabs={[{ name: "Iterations" }, { name: "Features", on: true }, { name: "Estimates" }]}
        >
          <Typography variant="h5" component="span">
            Northwind Ops
          </Typography>
          <Box>
            <Row head>
              <span>Capability</span>
              <span>Stability</span>
            </Row>
            {CLIENT_FEATURES.map(([feature, capabilities]) => (
              <Fragment key={feature}>
                <Row>
                  <Box component="span" sx={{ pt: 1, fontWeight: 600, color: "text.secondary" }}>
                    {feature}
                  </Box>
                </Row>
                {capabilities.map(([name, level]) => (
                  <Row key={name}>
                    <span>{name}</span>
                    <StabilityMark level={level} feature={name} />
                  </Row>
                ))}
              </Fragment>
            ))}
          </Box>
        </Mockup>
      </Grid>
    </Grid>
  );
}

/* The guide to showing stability levels: what each means, the mark, its sizes, colors, popover, and where it goes. */
export function StabilityLevelsGuideline() {
  return (
    <>
      <Guidance title="The levels">
        <p>
          Everything Exalynt builds is at one of four stability levels: Prototype, Alpha, Beta, or
          General Availability. The level tells people how stable something is right now, so they
          know what they can rely on before they rely on it. What each level means, and how work
          moves between them, is in the readme&rsquo;s{" "}
          <ReadmeLink path="how-it-works/stability-levels">Stability levels</ReadmeLink> page. This
          page covers how to show a level.
        </p>
        <p>
          <strong>Stability is used everywhere,</strong> and above all in client projects: their
          products show it to their own users, so everyone knows what to expect of each part. It
          also appears in Exalynt&rsquo;s tools and the readme.
        </p>
      </Guidance>

      <StabilityAndMaturity />

      <Guidance title="The mark">
        <p>
          Every product shows a level the same way, with the <code>StabilityMark</code>: the{" "}
          <strong>Track</strong>, four small cells with one lit for Prototype up to all four for GA,
          then the level&rsquo;s name, both in the level&rsquo;s color.
        </p>
        <ul>
          <li>
            <strong>The Track and the name carry the level, not the color.</strong> They read the
            same in grayscale and for people with color blindness. Color is a third signal on top.
          </li>
          <li>
            <strong>The mark is text, not a badge.</strong> No pill, background, border, or icon
            around it. It sits next to the thing it describes, at about the size of the text beside
            it, and scales with it.
          </li>
          <li>
            <strong>Never a percentage.</strong> A level is one of four names. Don&rsquo;t show it
            as &ldquo;75%&rdquo;, a progress bar, or a ring; percentages are maturity&rsquo;s.
          </li>
          <li>
            <strong>Every mark has a popover.</strong> It&rsquo;s how people learn what a level
            means where they see it, so <code>StabilityMark</code> always has one.
          </li>
        </ul>
      </Guidance>

      <Example title="Sizes">
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Level</TableCell>
                {SIZES.map(({ size, name }) => (
                  <TableCell key={size}>{name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {STABILITY_LEVELS.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell component="th" scope="row">
                    {entry.name}
                  </TableCell>
                  {SIZES.map(({ size }) => (
                    <TableCell key={size}>
                      <StabilityMark level={entry.id} size={size} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Example>
      <Guidance title="Which size">
        <ul>
          {SIZES.map(({ size, name, shows, use }) => (
            <li key={size}>
              <strong>{name}</strong> (<code>{size}</code>): {shows.toLowerCase()}. {use}
            </li>
          ))}
        </ul>
        <p>
          When in doubt, use the long mark. Use the short mark only where there&rsquo;s no room for
          the name, since the popover is then the only place it&rsquo;s shown.
        </p>
      </Guidance>

      <Example title="Colors, with the lowest contrast on Exalynt's page and card surfaces">
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Level</TableCell>
                <TableCell>Light surfaces</TableCell>
                <TableCell>Dark surfaces</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {STABILITY_LEVELS.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell component="th" scope="row">
                    <StabilityMark level={entry.id} size="extra-long" />
                  </TableCell>
                  <TableCell>
                    <Swatch color={entry.colors.light} surfaces={SURFACES.light} />
                  </TableCell>
                  <TableCell>
                    <Swatch color={entry.colors.dark} surfaces={SURFACES.dark} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Example>
      <Guidance title="Colors">
        <p>
          Each level has one color in two shades: pewter for Prototype, rose for Alpha, blue for
          Beta, and green for GA, a darker shade on light surfaces and a lighter one on dark. They
          belong to the levels, not to a brand, so they look the same under a client&rsquo;s theme
          as under Exalynt&rsquo;s.
        </p>
        <ul>
          <li>
            <strong>Keep marks on the base surface,</strong> the page or a card. On tinted surfaces,
            like table headers or side panels, the light shades drop below the 4.5:1 small text
            needs.
          </li>
          <li>
            <strong>Use the level colors only for stability and maturity.</strong> Not for status,
            success, errors, charts, or branding, so a level color always means a level.
          </li>
          <li>
            <strong>Don&rsquo;t recolor, tint, or fade a mark,</strong> or put it on a colored
            background. The colors and their contrast are checked together.
          </li>
          <li>
            <strong>Prototype&rsquo;s pewter isn&rsquo;t text grey.</strong> It&rsquo;s a violet
            grey, so a Prototype mark reads as a level and not as muted text.
          </li>
        </ul>
      </Guidance>

      <Example title="The popover, open">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <StabilityDetails level="alpha" />
        </Box>
      </Example>
      <Guidance title="The popover">
        <p>
          Every mark opens a popover that tells the client one thing: how stable this is. It shows
          the level&rsquo;s full name (General Availability, not GA) and how stable it is in a word,
          the four levels as a larger Track with this one lit, one sentence on what to expect, a
          short muted definition of stability, and a link to the level on readme.exalynt.com. The
          four boxes are whole and square-cornered, so they don&rsquo;t read as maturity&rsquo;s
          rounded bar, which fills to a percentage.
        </p>
        <ul>
          <li>
            <strong>Keep it about how stable it is.</strong> No advice for engineers, and nothing
            the client would need to decode. Maturity&rsquo;s popover follows the same layout, so
            the two read alike.
          </li>
          <li>
            <strong>Name what it&rsquo;s on.</strong> Pass <code>feature</code> (&ldquo;Invoice
            export&rdquo;) and the popover opens with &ldquo;Invoice export is in Beta.&rdquo;
            Always pass it on a short mark, and wherever the name isn&rsquo;t right beside the mark.
          </li>
          <li>
            <strong>Don&rsquo;t promise more than the level does</strong> in copy around a mark.
            Data in{" "}
            <ReadmeLink path="how-it-works/stability-levels#stability-prototype">
              Prototype
            </ReadmeLink>{" "}
            may be fake, and breaking changes in{" "}
            <ReadmeLink path="how-it-works/stability-levels#stability-beta">Beta</ReadmeLink> are
            announced ahead of time when we can, not always.
          </li>
          <li>
            <strong>It opens on hover, keyboard focus, and tap,</strong> and closes on Escape. The
            mark takes focus itself, except inside a button or link (
            <code>
              focusable=
              {"{false}"}
            </code>
            ), which already does.
          </li>
          <li>
            <strong>It follows the color scheme</strong> on the theme&rsquo;s paper, with a border
            and shadow to set it apart from the page it opens over.
          </li>
          <li>
            <strong>Its link opens in a new tab,</strong> so people can read more without losing
            their place. Turn it off (<code>link={"{false}"}</code>) where the mark is itself a link
            to the level.
          </li>
        </ul>
      </Guidance>

      <Example title="In context">
        <InContext />
      </Example>
      <Guidance title="Where to show it">
        <ul>
          <li>
            <strong>In a product, for end users:</strong> mark Prototype, Alpha, and Beta.{" "}
            <strong>GA shows nothing.</strong> GA is what people expect by default, so a mark on
            everything would hide the ones that matter.
          </li>
          <li>
            <strong>In the client app, for clients reviewing work:</strong> show every level, GA
            included. Clients are deciding what they can rely on, so every Capability&rsquo;s level
            is information.
          </li>
          <li>
            <strong>Put the mark on the thing that has the level.</strong> Mark Capabilities beside
            their names. Mark a Feature only where it has an overall level, such as its tab or page
            title (PageHeader&rsquo;s <code>badge</code>). Update the mark when the level changes.
          </li>
          <li>
            <strong>Inside a button or link,</strong> put the short mark after the label, with{" "}
            <code>focusable={"{false}"}</code>.
          </li>
        </ul>
      </Guidance>

      <Guidance title="Using the components">
        <ul>
          <li>
            <code>StabilityMark</code>: the mark, with its popover.
          </li>
          <li>
            <code>StabilityDetails</code>: the popover&rsquo;s content on its own, for help text or
            a legend. <code>card={"{false}"}</code> drops the card, for a card of your own.
          </li>
          <li>
            <code>STABILITY</code>, <code>STABILITY_LEVELS</code>: each level&rsquo;s name, how
            stable it is, summary, expectations, colors, and GitHub label, for your own layouts.
          </li>
          <li>
            <code>STABILITY_DOCS_URL</code>: where the levels are explained. Each level is at{" "}
            <code>#stability-&lt;level&gt;</code>.
          </li>
        </ul>
        <p>
          For the labels on issues and pull requests, see the readme&rsquo;s{" "}
          <ReadmeLink path="engineers/marking-stability">Marking stability levels</ReadmeLink>, and
          for what should be in place at each level, its{" "}
          <ReadmeLink path="how-it-works/stability-checklist">Stability checklist</ReadmeLink>.
        </p>
      </Guidance>
      <CodeBlock
        code={`import { StabilityMark } from "@exalynt/design/components";

<PageHeader
  title="Invoice export"
  badge={<StabilityMark level="beta" feature="Invoice export" size="extra-long" />}
/>

<Button>
  Compare scenarios{" "}
  <StabilityMark level="alpha" feature="Scenario compare" size="short" focusable={false} />
</Button>`}
      />
    </>
  );
}
