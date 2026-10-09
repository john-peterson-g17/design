import { Fragment, type ComponentType, type ReactNode } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import { StabilityBanner, StabilityMark, type StabilityLevelId } from "../../components";

/* The stability identifiers in made-up products: Northwind Ops on the web and
   on a phone, and Exalynt's own tools, the one place GA is shown. */

type NavItem = { name: string; level?: StabilityLevelId; on?: boolean };

/* A mockup with its caption under it, so mockups side by side line up at
   the top however long their captions run. */
function Figure({
  caption,
  maxWidth,
  children,
}: {
  caption: ReactNode;
  maxWidth?: number;
  children: ReactNode;
}) {
  return (
    <Box
      component="figure"
      sx={{ m: 0, mx: "auto", maxWidth, display: "flex", flexDirection: "column", gap: 1 }}
    >
      {children}
      <Typography component="figcaption" variant="caption" sx={{ color: "text.secondary" }}>
        {caption}
      </Typography>
    </Box>
  );
}

/* A web app, small: its name over a side nav and a page. The nav becomes a
   row above the page on a phone, as a Drawer's button would stand in for it. */
function WebWindow({
  caption,
  brandName,
  nav,
  children,
}: {
  caption: ReactNode;
  brandName: string;
  nav: NavItem[];
  children: ReactNode;
}) {
  return (
    <Figure caption={caption}>
      <Paper variant="outlined" sx={{ overflow: "hidden", fontSize: 13 }}>
        <Box sx={{ px: 2, py: 1.25, fontWeight: 700, borderBottom: 1, borderColor: "divider" }}>
          {brandName}
        </Box>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
          <Box
            component="nav"
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "column" },
              flexWrap: "wrap",
              gap: { xs: "6px 16px", sm: 1 },
              flexShrink: 0,
              width: { sm: 140 },
              px: 2,
              py: { xs: 1, sm: 2 },
              color: "text.secondary",
              borderBottom: { xs: 1, sm: 0 },
              borderRight: { sm: 1 },
              borderColor: "divider",
            }}
          >
            {nav.map((item) => (
              <Box
                key={item.name}
                component="span"
                sx={[
                  { display: "inline-flex", alignItems: "center", gap: 0.75, whiteSpace: "nowrap" },
                  !!item.on && { fontWeight: 600, color: "text.primary" },
                ]}
              >
                {item.name}
                {item.level ? (
                  <StabilityMark level={item.level} feature={item.name} size="short" />
                ) : null}
              </Box>
            ))}
          </Box>
          <Box
            sx={{ flex: 1, minWidth: 0, p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}
          >
            {children}
          </Box>
        </Box>
      </Paper>
    </Figure>
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

const NORTHWIND_NAV: NavItem[] = [
  { name: "Overview" },
  { name: "Forecasts", level: "beta" },
  { name: "Routing", level: "alpha" },
  { name: "Assistant", level: "prototype" },
];

function northwindNav(on: string) {
  return NORTHWIND_NAV.map((item) => ({ ...item, on: item.name === on }));
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

/* Northwind Ops' answer to a question, as sample data. */
function SampleAnswer() {
  return (
    <Paper variant="outlined" sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 0.75 }}>
      <Box sx={{ fontWeight: 600 }}>Which routes ran late last week?</Box>
      <Box sx={{ color: "text.secondary" }}>
        Route 14 ran late on 3 of 5 days, by 22 minutes on average. Route 9 ran late once.
      </Box>
    </Paper>
  );
}

/* Web apps: the end-user product, where no mark means GA, a Prototype page
   with a banner, and Exalynt's own tools, where every level shows. */
export function WebApps() {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <WebWindow
          caption="For end users: short marks in the side nav, the extra-long mark beside the page title, long marks in the table, and a short one in a button. Monthly rollup is GA, so it has no mark."
          brandName="Northwind Ops"
          nav={northwindNav("Forecasts")}
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
        </WebWindow>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <WebWindow
          caption="A Prototype page with sample data: a banner under the title, in place of the title's mark, since its answers could pass for real ones."
          brandName="Northwind Ops"
          nav={northwindNav("Assistant")}
        >
          <Typography variant="h5" component="span">
            Assistant
          </Typography>
          <StabilityBanner
            level="prototype"
            feature="Assistant"
            title="Answers here use sample data."
          >
            It&rsquo;s a prototype to help choose a direction. Don&rsquo;t act on these numbers.
          </StabilityBanner>
          <SampleAnswer />
        </WebWindow>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <WebWindow
          caption="Exalynt's own tools, where clients follow the Features we're working on for them: the only place GA is shown, beside every Capability."
          brandName="Exalynt"
          nav={[{ name: "Iterations" }, { name: "Features", on: true }, { name: "Estimates" }]}
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
        </WebWindow>
      </Grid>
    </Grid>
  );
}

/* Bottom tabs carry no marks: there's no room beside a tab's label, and the
   screen a tab opens shows its level under the title. */
const PHONE_TABS: { name: string; Icon: ComponentType<SvgIconProps> }[] = [
  { name: "Today", Icon: HomeOutlinedIcon },
  { name: "Forecasts", Icon: InsightsOutlinedIcon },
  { name: "Assistant", Icon: AutoAwesomeOutlinedIcon },
];

/* A phone screen, small: an app bar with the screen's title, the screen, and
   the bottom tabs if `tab` is given. */
function PhoneScreen({
  caption,
  title,
  belowTitle,
  back = false,
  tab,
  children,
}: {
  caption: ReactNode;
  title: string;
  belowTitle?: ReactNode;
  back?: boolean;
  tab?: string;
  children: ReactNode;
}) {
  return (
    <Figure caption={caption} maxWidth={300}>
      <Paper
        variant="outlined"
        sx={{
          minHeight: 480,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 5,
          fontSize: 14,
        }}
      >
        <Box sx={{ px: 2, pt: 2.5, pb: 1.5, borderBottom: 1, borderColor: "divider" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {back ? <ArrowBackIcon fontSize="small" sx={{ color: "text.secondary" }} /> : null}
            <Typography variant="h5" component="span">
              {title}
            </Typography>
          </Box>
          {belowTitle ? <Box sx={{ mt: 0.75 }}>{belowTitle}</Box> : null}
        </Box>
        <Box sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
          {children}
        </Box>
        {tab ? (
          <BottomNavigation showLabels value={tab} sx={{ borderTop: 1, borderColor: "divider" }}>
            {PHONE_TABS.map(({ name, Icon }) => (
              <BottomNavigationAction
                key={name}
                value={name}
                label={name}
                icon={<Icon />}
                sx={{ minWidth: 0 }}
              />
            ))}
          </BottomNavigation>
        ) : null}
      </Paper>
    </Figure>
  );
}

/* List rows at the phone mockup's scale, under its 16px screen title. */
const ROW_PRIMARY = { sx: { fontSize: 14, fontWeight: 500 } };
const ROW_SECONDARY = { sx: { fontSize: 13 } };

const PHONE_CAPABILITIES: [string, StabilityLevelId, string][] = [
  ["Monthly rollup", "ga", "Revenue by month, to date."],
  ["Seasonal adjustment", "beta", "Evens out the holiday peak."],
  ["Scenario compare", "alpha", "Two forecasts side by side."],
];

const EARLY_ACCESS: [string, StabilityLevelId, string, boolean][] = [
  ["Smart routing", "alpha", "Suggests the fastest order for your stops.", true],
  ["Voice notes", "beta", "Dictate a note on any delivery.", false],
];

/* The same product on a phone: tabs, a Feature's screen, a Prototype's
   screen with a banner, and a settings screen to opt in early. */
export function MobileApps() {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <PhoneScreen
          caption="The extra-long mark under the screen's title, long marks beside rows, and a short one in a button. The bottom tabs carry none, and Monthly rollup is GA, so it has none either."
          title="Revenue forecast"
          belowTitle={<StabilityMark level="beta" feature="Revenue forecast" size="extra-long" />}
          tab="Forecasts"
        >
          <List disablePadding sx={{ mx: -2 }}>
            {PHONE_CAPABILITIES.map(([name, level, description]) => (
              <ListItemButton key={name} sx={{ px: 2 }}>
                <ListItemText
                  primary={
                    <Box
                      component="span"
                      sx={{
                        display: "inline-flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {name}
                      {level !== "ga" ? (
                        <StabilityMark level={level} feature={name} focusable={false} />
                      ) : null}
                    </Box>
                  }
                  secondary={description}
                  slotProps={{ primary: ROW_PRIMARY, secondary: ROW_SECONDARY }}
                  sx={{ my: 0 }}
                />
                <ChevronRightIcon fontSize="small" sx={{ color: "text.secondary" }} />
              </ListItemButton>
            ))}
          </List>
          <Button variant="outlined" fullWidth>
            Compare scenarios{" "}
            <StabilityMark
              level="alpha"
              feature="Scenario compare"
              size="short"
              focusable={false}
            />
          </Button>
        </PhoneScreen>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <PhoneScreen
          caption="A Prototype screen with sample data: a banner at the top, with copy short enough to leave room for the screen."
          title="Assistant"
          tab="Assistant"
        >
          {/* No action here: the banner lays out by the screen's width, not
              this mockup's. Its own page's phone preview shows one on a phone. */}
          <StabilityBanner level="prototype" feature="Assistant" title="Answers use sample data.">
            Don&rsquo;t act on these numbers yet.
          </StabilityBanner>
          <SampleAnswer />
        </PhoneScreen>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <PhoneScreen
          caption="Settings where people opt in early: a long mark beside each option's name."
          title="Early access"
          back
        >
          <List disablePadding sx={{ mx: -2 }}>
            {EARLY_ACCESS.map(([name, level, description, on]) => (
              <ListItem
                key={name}
                /* MUI's 48px for a secondary action is narrower than a switch. */
                sx={{ pl: 2, pr: 9 }}
                secondaryAction={
                  <Switch
                    edge="end"
                    defaultChecked={on}
                    slotProps={{ input: { "aria-label": name } }}
                  />
                }
              >
                <ListItemText
                  primary={
                    <Box
                      component="span"
                      sx={{
                        display: "inline-flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {name}
                      <StabilityMark level={level} feature={name} />
                    </Box>
                  }
                  secondary={description}
                  slotProps={{ primary: ROW_PRIMARY, secondary: ROW_SECONDARY }}
                  sx={{ my: 0 }}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            These are still changing, and may stop working for a while. Turn them off any time.
          </Typography>
        </PhoneScreen>
      </Grid>
    </Grid>
  );
}

const WHERE: [string, string, string][] = [
  [
    "Short mark",
    "Side nav and tab items, menu items, and buttons.",
    "Buttons, and any row too tight for the name. Not bottom tabs: the screen they open shows the level.",
  ],
  [
    "Long mark",
    "Beside a name in a table or list, in a Stability column, and in running text.",
    "Beside a row's title in lists and settings.",
  ],
  [
    "Extra-long mark",
    "Beside the page title, as PageHeader's badge. Once per page.",
    "Under the screen's title, rather than beside it. Once per screen.",
  ],
  [
    "StabilityBanner",
    "Under PageHeader, on the rare page that needs it, in place of the title's mark.",
    "At the top of the screen, under the app bar, with one or two short sentences.",
  ],
  [
    "GA",
    "Nothing: no mark means GA. Only Exalynt's own tools, where clients follow the Features we're working on, mark it.",
    "Nothing: no mark means GA.",
  ],
  [
    "StabilityDetails",
    "Help text, or a legend of the levels.",
    "A help or about screen, with card={false}.",
  ],
];

/* Which identifier goes where, on the web and on a phone. */
export function WhereTable() {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>In a web app</TableCell>
            <TableCell>In a mobile app</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {WHERE.map(([identifier, web, mobile]) => (
            <TableRow key={identifier}>
              <TableCell component="th" scope="row" sx={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                {identifier}
              </TableCell>
              <TableCell>{web}</TableCell>
              <TableCell>{mobile}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
