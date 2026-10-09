import type { ComponentType } from "react";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import TableRowsOutlinedIcon from "@mui/icons-material/TableRowsOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ContrastOutlinedIcon from "@mui/icons-material/ContrastOutlined";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import DynamicFormOutlinedIcon from "@mui/icons-material/DynamicFormOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import StairsOutlinedIcon from "@mui/icons-material/StairsOutlined";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import WebAssetOutlinedIcon from "@mui/icons-material/WebAssetOutlined";
import { CalloutPanelDemo } from "../components/CalloutPanel.demo";
import { ConfirmDialogDemo } from "../components/ConfirmDialog.demo";
import { EmptyStateDemo } from "../components/EmptyState.demo";
import { PageHeaderDemo } from "../components/PageHeader.demo";
import { SearchSelectDemo } from "../components/SearchSelect.demo";
import { SectionCardDemo } from "../components/SectionCard.demo";
import { StatCardDemo } from "../components/StatCard.demo";
import { MaturityDetailsDemo } from "../components/MaturityDetails.demo";
import { MaturityRingDemo } from "../components/MaturityRing.demo";
import { StabilityBannerDemo } from "../components/StabilityBanner.demo";
import { StabilityDetailsDemo } from "../components/StabilityDetails.demo";
import { StabilityMarkDemo } from "../components/StabilityMark.demo";
import { ThemeToggleDemo } from "../components/ThemeToggle.demo";
import { DataTableDemo } from "../components/table/DataTable.demo";
import { ListTableDemo } from "../components/table/ListTable.demo";
import { Mark } from "../exalynt";
import { BrandDemo } from "../exalynt/Brand.demo";
import { PaletteDemo } from "./foundations/Palette";
import { FormsGuideline } from "./guidelines/Forms";
import { MuiFirstGuideline } from "./guidelines/MuiFirst";
import { PagesGuideline } from "./guidelines/Pages";
import { TablesGuideline } from "./guidelines/Tables";
import { TypographyDemo } from "./foundations/Typography";
import { MaturityGuideline } from "./guidelines/Maturity";
import { StabilityLevelsGuideline } from "./guidelines/StabilityLevels";

export type Entry = {
  /** The export's name; also the page's address (#PageHeader). */
  title: string;
  description: string;
  /** The package entry point it's imported from, if it's exported. */
  importFrom?: "components" | "exalynt";
  /** How it behaves on a phone, shown in the page's "On phones" callout. */
  phone?: string;
  icon: ComponentType<SvgIconProps>;
  Demo: ComponentType;
};

export type Group = { title: string; entries: Entry[] };

/* Every page, grouped as the side nav shows them. A new component adds its demo here. */
export const catalog: Group[] = [
  {
    title: "Foundations",
    entries: [
      {
        title: "MUI first",
        description:
          "Pages are built from MUI's components, styled by the theme. This system adds a component only where MUI alone doesn't do the job well, and when it lists one for a job, use it.",
        icon: LayersOutlinedIcon,
        Demo: MuiFirstGuideline,
      },
      {
        title: "Palette",
        description:
          "The palette roles components may use, as the current mode paints them. Components take colors from these roles only, never from raw tokens, so they also render under a client project's own theme.",
        phone:
          "Nothing changes by screen size. Check a page in both modes on a phone anyway: small text in `text.secondary` is the first thing to get hard to read.",
        icon: PaletteOutlinedIcon,
        Demo: PaletteDemo,
      },
      {
        title: "Typography",
        description: "The type scale, one line per variant.",
        phone:
          "The scale is fixed, so h1 and h2 are for big moments only. An app page's title comes from PageHeader, which steps down to 22px on phones. Long words wrap rather than push the page sideways.",
        icon: TextFieldsOutlinedIcon,
        Demo: TypographyDemo,
      },
    ],
  },
  {
    title: "Responsive",
    entries: [
      {
        title: "Pages",
        description:
          "How every page holds up on a phone: the rules, and the layouts that follow them. Open the phone preview to see these examples at 375px.",
        icon: DevicesOutlinedIcon,
        Demo: PagesGuideline,
      },
      {
        title: "Tables",
        description:
          "Tables are the widest thing on most pages, so each one picks how it fits a phone: scroll inside its container, hide its secondary columns, or turn its rows into cards.",
        icon: TableChartOutlinedIcon,
        Demo: TablesGuideline,
      },
    ],
  },
  {
    title: "Brand",
    entries: [
      {
        title: "Brand",
        description:
          "The wordmark lockup: the mark, tracked caps, and the tool's name as a badge. It renders no link of its own; wrap it in the app's router link. `compact` drops the badge on phones.",
        importFrom: "exalynt",
        phone:
          "`compact` hides the product badge below sm, so a phone's top bar has room for the menu button and account controls.",
        icon: Mark,
        Demo: BrandDemo,
      },
    ],
  },
  {
    title: "Layout",
    entries: [
      {
        title: "PageHeader",
        description:
          "How every page opens: breadcrumbs or a record switcher, the title, one line of orientation, and actions pinned right. Compact, so the work starts above the fold.",
        importFrom: "components",
        phone:
          "Below sm the actions drop under the title and wrap onto more lines rather than squeezing it, and the title steps down from 26px to 22px.",
        icon: WebAssetOutlinedIcon,
        Demo: PageHeaderDemo,
      },
      {
        title: "SectionCard",
        description:
          "The workhorse panel: an outlined card with an optional titled header and action, a hairline divider, and a body. Pass `disableContentPadding` when the body is a table or list.",
        importFrom: "components",
        phone:
          "It fills its container's width. Put cards in a Grid with `size={{ xs: 12, md: 6 }}` so they stack on phones. A table inside uses `disableContentPadding` and follows the Tables guideline.",
        icon: ViewAgendaOutlinedIcon,
        Demo: SectionCardDemo,
      },
      {
        title: "CalloutPanel",
        description:
          "A raised band for the one or two panels on a page that speak to the reader rather than show their data, such as buying more capacity.",
        importFrom: "components",
        phone: "Its padding steps down from 32px to 24px on phones.",
        icon: CampaignOutlinedIcon,
        Demo: CalloutPanelDemo,
      },
    ],
  },
  {
    title: "Data display",
    entries: [
      {
        title: "StatCard",
        description:
          "A single headline number with its label and one line of context. `accent` is for the one number a page is about.",
        importFrom: "components",
        phone:
          "Its type doesn't change. Give a row of stats `size={{ xs: 12, sm: 4 }}` so each gets the full width on a phone, or `xs: 6` for two across when the numbers are short.",
        icon: InsightsOutlinedIcon,
        Demo: StatCardDemo,
      },
      {
        title: "EmptyState",
        description: "What a list or page shows before it has anything in it.",
        importFrom: "components",
        phone: "Centered, with its description capped at 48ch, so it reads the same at any width.",
        icon: InboxOutlinedIcon,
        Demo: EmptyStateDemo,
      },
    ],
  },
  {
    title: "Stability",
    entries: [
      {
        title: "Stability levels",
        description:
          "How to show a stability level: the mark at each size and in which colors, the banner for the few pages that need one, where each goes in web and mobile apps, and how it differs from maturity on screen. Used everywhere, above all in client projects. What each level means is in the readme.",
        icon: StairsOutlinedIcon,
        Demo: StabilityLevelsGuideline,
      },
      {
        title: "StabilityMark",
        description:
          "A stability level's mark: the Track and the level's name in the level's color, with a popover telling the client how stable it is. Pass `feature` so it opens with \"Invoice export is in Alpha.\" `size` is `short`, `long`, or `extra-long`; pass `focusable={false}` inside a button or link.",
        importFrom: "components",
        phone:
          "It's sized in em, so it scales with the text beside it and never wraps. A tap opens the popover, which is 300px wide at most and keeps 12px from the screen's edges. Where a row is tight on a phone, drop to the short mark rather than let the name wrap.",
        icon: SignalCellularAltOutlinedIcon,
        Demo: StabilityMarkDemo,
      },
      {
        title: "StabilityBanner",
        description:
          "A stability level as a callout, for the few pages where missing it would cost someone something: a Prototype's fake data, or real work going into an Alpha. The extra-long mark, the level's summary and what people can rely on it for, and one optional `action`. Pass `title` and children for copy specific to the page. Never for GA.",
        importFrom: "components",
        phone:
          "The action drops under the text and the padding steps down from 24px to 20px. Keep the copy to two short sentences: on a phone, a banner can fill the first screen.",
        icon: FlagOutlinedIcon,
        Demo: StabilityBannerDemo,
      },
      {
        title: "StabilityDetails",
        description:
          "How stable something is, as StabilityMark's popover shows it: the level's full name and how stable it is in a word, the four levels as boxes with this one lit, what to expect, and what stability is. On its own, for help text or a legend; `card={false}` drops the card to sit in one of your own.",
        importFrom: "components",
        phone:
          "The card is 300px wide, or the screen less 24px when that's narrower. With `card={false}` it fills its container.",
        icon: ChatBubbleOutlineOutlinedIcon,
        Demo: StabilityDetailsDemo,
      },
    ],
  },
  {
    title: "Maturity",
    entries: [
      {
        title: "Maturity",
        description:
          "How to show a Feature's or a project's maturity: always as the ring, worked out with `featureMaturity` and `projectMaturity`, never by hand. Mostly for Exalynt's own tools, so clients can follow progress. What it means and how it's counted are in the readme.",
        icon: TrendingUpOutlinedIcon,
        Demo: MaturityGuideline,
      },
      {
        title: "MaturityRing",
        description:
          "Maturity's only look, for a Feature or a project: four quarter arcs from Prototype to General Availability, filled to the percentage in its band's color, with a popover (MaturityDetails) saying how mature it is. Pass `subject` and `count`, `labelled` at the top of a project's page, and a `breakdown` of what it's made of.",
        importFrom: "components",
        phone:
          "Fixed at `size`: 52px by default, 24px in a list row, where the percentage sits beside it. On a phone's project page, put the labelled ring under the title rather than squeezing it beside a long one.",
        icon: DonutLargeOutlinedIcon,
        Demo: MaturityRingDemo,
      },
      {
        title: "MaturityDetails",
        description:
          "How mature a Feature or a project is, as MaturityRing's popover shows it: the ring and its band, what the band means, an optional `breakdown`, and a short definition of maturity. On its own with `card={false}` in a card of your own.",
        importFrom: "components",
        phone:
          "The card is 300px wide, or the screen less 24px when that's narrower. With `card={false}` it fills its container.",
        icon: ChatBubbleOutlineOutlinedIcon,
        Demo: MaturityDetailsDemo,
      },
    ],
  },
  {
    title: "Inputs",
    entries: [
      {
        title: "Forms",
        description:
          "Which MUI input fits which job, and how a form is labelled, checked and laid out. Inputs are MUI's, as the theme styles them, except SearchSelect.",
        phone:
          "Fields fill the width and side-by-side pairs stack. Input text stays at 16px so iOS doesn't zoom in on focus. A select's menu and SearchSelect's list keep MUI's 48px rows on phones.",
        icon: DynamicFormOutlinedIcon,
        Demo: FormsGuideline,
      },
      {
        title: "SearchSelect",
        description:
          "Picks one option from a list long enough to search: people, clients, projects. Every typed word must match the label, `description` or `group`, in any order and ignoring accents; matches are bolded and Enter takes the top one. For a short list, use a select.",
        importFrom: "components",
        phone:
          "Fills its container's width. The list opens under it at up to 40% of the screen's height, with 48px rows below sm so they're easy to tap.",
        icon: ManageSearchOutlinedIcon,
        Demo: SearchSelectDemo,
      },
    ],
  },
  {
    title: "Tables",
    entries: [
      {
        title: "ListTable",
        description:
          "A whole table in a card, with each extra picked by a prop: `search`, `filters`, `pagination`, and sorting from any column marked `sortable`. It works on rows the app already has in full, in memory.",
        importFrom: "components",
        phone:
          "Search and the Filters button share a row, and the filters stack full width when opened. The row count hides, and pagination keeps its arrows but drops the Per page label. Columns follow their `hideBelow`.",
        icon: TableRowsOutlinedIcon,
        Demo: ListTableDemo,
      },
      {
        title: "DataTable",
        description:
          "The table alone: columns, striped rows, sortable headings, and rows that open something on click. It holds no state, so the rows and their order can come from anywhere, a server-paged list included.",
        importFrom: "components",
        phone:
          "Wider than the screen, it scrolls inside its own container. A column with `hideBelow` drops out instead, and while one does the table lets go of its minimum width so the rest fits.",
        icon: GridOnOutlinedIcon,
        Demo: DataTableDemo,
      },
    ],
  },
  {
    title: "Actions",
    entries: [
      {
        title: "ConfirmDialog",
        description:
          "Asks before something that can't be taken back with a click. It stays open, its buttons disabled, while `onConfirm` runs, and closes only when that succeeds.",
        importFrom: "components",
        phone:
          "On phones the theme sets every dialog 16px from the screen's edges instead of 32px, so it uses nearly the full width. The buttons keep their full size.",
        icon: HelpOutlineOutlinedIcon,
        Demo: ConfirmDialogDemo,
      },
      {
        title: "ThemeToggle",
        description:
          "Flips between light and dark mode through MUI's `useColorScheme()`, so it needs a theme with both color schemes.",
        importFrom: "components",
        phone:
          "A 34px square at every width. Keep it in a top bar with room around it rather than squeezed between other controls.",
        icon: ContrastOutlinedIcon,
        Demo: ThemeToggleDemo,
      },
    ],
  },
];
