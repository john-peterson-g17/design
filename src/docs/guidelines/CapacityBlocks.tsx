import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  CAPACITY_BLOCK_IDS,
  CAPACITY_BLOCKS,
  CapacityFigure,
  capacitySize,
} from "../../components";
import { CodeBlock } from "../CodeBlock";
import { Example } from "../Example";
import { Guidance } from "../Guidance";
import { ReadmeLink } from "../ReadmeLink";

const CAPACITY = "how-it-works/engineering-capacity";

function Blocks() {
  return (
    <Grid container spacing={1.5}>
      {CAPACITY_BLOCK_IDS.map((id) => {
        const { name, units } = CAPACITY_BLOCKS[id];
        return (
          <Grid key={id} size={{ xs: 12, sm: 4 }}>
            <Paper variant="outlined" sx={{ height: "100%", p: 2 }}>
              <Stack spacing={0.5} sx={{ alignItems: "center", textAlign: "center" }}>
                <CapacityFigure units={units} size={80} />
                <Typography variant="subtitle2" sx={{ pt: 0.5 }}>
                  {name} block
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {capacitySize(units)}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}

/*
 * The guide to showing capacity blocks: how a block is named and sized, the
 * figure, the card and its popover, and offering blocks to buy. What capacity
 * is, what a block supports, and how blocks are priced live in the readme,
 * which this links to rather than repeats.
 */
export function CapacityBlocksGuideline() {
  return (
    <>
      <Guidance title="What capacity is">
        <p>
          Exalynt sells Engineering Capacity in fixed-price blocks, not hours: Flex, Core, and
          Dedicated. What a block is, what it supports, and how it&rsquo;s priced are in the
          readme&rsquo;s <ReadmeLink path={CAPACITY}>Engineering Capacity</ReadmeLink> page. This
          page covers how to show a block.
        </p>
        <p>
          <strong>It&rsquo;s for Exalynt&rsquo;s own tools.</strong> The portal shows clients the
          blocks they&rsquo;ve bought, where each one goes, and when it&rsquo;s worked on. Client
          products never show capacity.
        </p>
      </Guidance>

      <Example title="The three blocks">
        <Blocks />
      </Example>
      <Guidance title="Naming a block and its size">
        <ul>
          <li>
            <strong>By its name and &ldquo;block&rdquo;:</strong> &ldquo;Core block&rdquo;, from{" "}
            <code>CAPACITY_BLOCKS[type].name</code>. Never &ldquo;a 2-unit block&rdquo;.
          </li>
          <li>
            <strong>Its size as a share of an engineer&rsquo;s week,</strong> from{" "}
            <code>capacitySize</code>: &ldquo;About ½ of an engineer&rsquo;s week&rdquo;.
            That&rsquo;s the reference clients already use. The fraction is one character (¼, ½, ¾),
            never spelled out or written 1/2, and the line is always muted, in{" "}
            <code>text.secondary</code>, under the block&rsquo;s name.
          </li>
          <li>
            <strong>Hours only as a sense of size.</strong> A block&rsquo;s{" "}
            <ReadmeLink path={`${CAPACITY}#blocks`}>effort reference</ReadmeLink> (~10, ~20, or ~40
            hours, from <code>referenceHours</code>) is approximate overall effort, not hours
            bought, reserved, or tracked. Show it only as the popover does, &ldquo;comparable to ~20
            hours of engineering focus, attention, and effort&rdquo;, with the reminder that the
            price is for the block. Never put it on the card, as a block&rsquo;s size, or counting
            down.
          </li>
          <li>
            <strong>Units only where the work is measured in them,</strong> such as an
            estimate&rsquo;s Low, Mid, and High range (see the readme&rsquo;s{" "}
            <ReadmeLink path="clients/project-estimates">Project estimates</ReadmeLink>) or an
            engineer&rsquo;s availability.
          </li>
          <li>
            <strong>Prices come from the app,</strong> which has them from the API or exalynt.com.
            This package doesn&rsquo;t hold them, so a price can&rsquo;t go stale here.
          </li>
        </ul>
      </Guidance>

      <Guidance title="The figure">
        <p>
          <code>CapacityFigure</code> pictures a block the way the readme does: one engineer, filled
          from the feet up by the block&rsquo;s share of their week. A capacity unit fills a
          quarter, so Flex fills to the knees, Core to the waist, and Dedicated the whole figure.
          It&rsquo;s decorative, so always put the block&rsquo;s name and size in words beside it.
        </p>
        <ul>
          <li>
            <strong>In the theme&rsquo;s colors:</strong> <code>primary.main</code> for a block
            that&rsquo;s the reader&rsquo;s, <code>text.secondary</code> for a choice they
            haven&rsquo;t picked yet. Never in the stability level colors, and never colored by a
            block&rsquo;s status.
          </li>
          <li>
            <strong>At a few fixed sizes:</strong> 48px tall on a card, 64px in the popover, and
            80px where comparing blocks is the point, such as choosing one to buy. Below 48px the
            quarters stop reading, so in a list row write the name instead.
          </li>
          <li>
            <strong>One figure is one engineer&rsquo;s week,</strong> never several blocks added up.
            A week&rsquo;s bookings on a schedule are a different picture.
          </li>
        </ul>
      </Guidance>

      <Guidance title="The card">
        <p>
          <code>CapacityBlock</code> is how a block appears wherever it is: waiting for a week, in
          its week on a schedule, or being moved. It shows the figure, the name, and the size, then
          <code>children</code>, normally <code>CapacityPlacement</code> (the project and focus
          it&rsquo;s on), and <code>footer</code> (when it&rsquo;s worked on, or the way to schedule
          it).
        </p>
        <ul>
          <li>
            <strong>Everything lines up on the figure.</strong> The figure and every icon under it
            share one vertical axis, in every state. <code>CapacityPlacement</code> already does;
            build the <code>footer</code>, and any line of your own, from <code>CapacityLine</code>{" "}
            rather than an icon and text of your own, which would sit a few pixels off.
          </li>
          <li>
            <strong>The status badge has its own column,</strong> right of the name and size and
            centred on the figure, so it never sits over the size and the text stops short of it.
          </li>
          <li>
            <strong>One card per block.</strong> Three Core blocks are three cards, so each can go
            to its own project and week. Count them in a heading or a group&rsquo;s label instead.
          </li>
          <li>
            <strong>States are props, not colors of your own:</strong> <code>selected</code> when
            it&rsquo;s picked to act on, <code>scheduled</code> once it&rsquo;s in a week,{" "}
            <code>preview</code> for the dashed outline of where a dragged block will land, and{" "}
            <code>faded</code> on the block being dragged away.
          </li>
          <li>
            <strong>Say why it can&rsquo;t move.</strong> Pass <code>onDragStart</code> and a{" "}
            <code>dragHint</code> where it can be dragged, and <code>locked</code> with the reason
            where it can&rsquo;t yet, such as its week having started.
          </li>
          <li>
            <strong>
              Status goes in <code>badge</code>,
            </strong>{" "}
            as the app&rsquo;s own status chip, never as a tint on the card or the figure.
          </li>
          <li>
            <strong>In a list row or running text,</strong> where a card is too much, write the
            block&rsquo;s name in words (&ldquo;Core block&rdquo;, in <code>subtitle2</code>) and
            leave the figure out.
          </li>
        </ul>
      </Guidance>
      <CodeBlock
        code={`import { CapacityBlock, CapacityPlacement } from "@exalynt/design/components";

<CapacityBlock
  block={capacity.type}
  scheduled={Boolean(capacity.week_starts_on)}
  locked={lockReason(capacity) ?? undefined}
  footer={<When capacity={capacity} />}
>
  <CapacityPlacement project={project?.name ?? null} focus={focus?.name} upNext={next?.name} />
</CapacityBlock>`}
      />

      <Guidance title="Where it goes: project and focus">
        <p>
          A block is bought for the organization, then put on a project, then, optionally, kept on
          one Feature or bug from that project&rsquo;s Up next. <code>CapacityPlacement</code> shows
          where it is on that path as two lines that are always there, so a card never changes size
          as it moves along.
        </p>
        <ul>
          <li>
            <strong>No project:</strong> the project line is the card&rsquo;s call to action,
            &ldquo;Assign project&rdquo; in the primary color, wherever the reader can assign one
            (pass <code>onProjectClick</code>). Where they can&rsquo;t, it says &ldquo;No project
            yet&rdquo;. The focus line stays in place, disabled, as &ldquo;Choose a focus&rdquo;,
            since a focus comes from a project&rsquo;s backlog, and the footer&rsquo;s Schedule
            waits, disabled, with a hint saying the block needs a project first. A disabled control
            always says why on hover.
          </li>
          <li>
            <strong>A project but no focus:</strong> the block follows Up next, shown as &ldquo;Up
            next&rdquo; in the primary color and what&rsquo;s first there now (<code>upNext</code>).
            That&rsquo;s a fine way to leave a block, not a gap, so never show it as a warning or
            ask the client to choose.
          </li>
          <li>
            <strong>A focus:</strong> its name, with its own Feature or bug icon as{" "}
            <code>focusIcon</code>.
          </li>
          <li>
            <strong>Each change is the app&rsquo;s.</strong> <code>onProjectClick</code> and{" "}
            <code>onFocusClick</code> hand over the line to anchor a picker to, such as{" "}
            <code>SearchSelect</code> in a popover. Leave them out once the block can&rsquo;t be
            changed, and say why with the card&rsquo;s <code>locked</code>.
          </li>
          <li>
            <strong>Status is separate:</strong> a block with no project is still
            &ldquo;Available&rdquo;. Don&rsquo;t invent a status such as &ldquo;Unassigned&rdquo;;
            the project line already says it.
          </li>
        </ul>
      </Guidance>

      <Guidance title="The popover">
        <p>
          A block&rsquo;s name opens <code>CapacityDetails</code> on hover, keyboard focus, or tap:
          the block&rsquo;s figure and share of the week, the hours it&rsquo;s comparable to, one
          muted line saying the price is for the block, not hours, and a link to the readme&rsquo;s
          Engineering Capacity page. It&rsquo;s written for someone who doesn&rsquo;t know what a
          capacity unit is, so it never says &ldquo;unit&rdquo;. Keep it to that. What a block
          supports and how it&rsquo;s priced are the readme&rsquo;s to explain. Use{" "}
          <code>CapacityDetails</code> with <code>card={"{false}"}</code> where a page explains a
          block in a card of its own.
        </p>
      </Guidance>

      <Guidance title="Offering blocks to buy">
        <ul>
          <li>
            <strong>Show all three, smallest first,</strong> each with its figure at 80px, its name,
            and its price, with Core picked to start with, as the standard block. The readme&rsquo;s{" "}
            <ReadmeLink path={`${CAPACITY}#how-block-prices-are-set`}>prices section</ReadmeLink>{" "}
            explains why smaller blocks cost a little more per unit; don&rsquo;t restate it.
          </li>
          <li>
            <strong>Make it one choice,</strong> as a radio group of cards, with the unpicked
            blocks&rsquo; figures in <code>text.secondary</code>. Where only the name fits, such as
            a compact control in an estimate, use MUI&rsquo;s <code>ToggleButtonGroup</code>.
          </li>
          <li>
            <strong>Link to the readme</strong> for what a block is, rather than writing a paragraph
            about it in the dialog.
          </li>
        </ul>
      </Guidance>
    </>
  );
}
