import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import {
  DataTable,
  SectionCard,
  StatCard,
  formatMoney,
  parseMoney,
  type Column,
} from "../../components";
import { CodeBlock } from "../CodeBlock";
import { Example } from "../Example";
import { Guidance } from "../Guidance";
import { Rules } from "./Rules";

type Sample = { note: string; cents: number };

const samples: Sample[] = [
  { note: "An invoice", cents: 120050 },
  { note: "A few cents", cents: 5 },
  { note: "Nothing", cents: 0 },
  { note: "A credit", cents: -2500 },
  { note: "A large total", cents: 3800000000 },
];

const sampleColumns: Column<Sample>[] = [
  { id: "note", header: "What", value: (row) => row.note },
  {
    id: "cents",
    header: "From the API",
    align: "right",
    value: (row) => row.cents,
    sx: { fontFamily: "monospace", color: "text.secondary" },
  },
  {
    id: "shown",
    header: "On screen",
    align: "right",
    render: (row) => formatMoney(row.cents),
    sx: { fontVariantNumeric: "tabular-nums" },
  },
];

function AmountField() {
  const [text, setText] = useState("1,200.50");
  const [touched, setTouched] = useState(false);
  const cents = parseMoney(text);
  const error = touched && cents === null;
  return (
    <Box sx={{ maxWidth: 320 }}>
      <TextField
        label="Budget"
        fullWidth
        value={text}
        onChange={(event) => setText(event.target.value)}
        onBlur={() => setTouched(true)}
        error={error}
        helperText={
          error
            ? "Enter an amount like 1,200.50, with at most two decimals."
            : `Sent as ${cents ?? "…"} cents.`
        }
        slotProps={{
          input: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
          htmlInput: { inputMode: "decimal" },
        }}
      />
    </Box>
  );
}

export function MoneyGuideline() {
  return (
    <>
      <Guidance title="Cents from the server, money on screen">
        <p>
          The API sends and takes every amount as a whole number of cents: <code>120050</code> is
          $1,200.50. Never a decimal, because floating point can&apos;t hold most of them exactly (
          <code>0.1 + 0.2</code> is <code>0.30000000000000004</code>), and the error grows with
          every sum.
        </p>
        <p>
          Keep amounts in cents in the app&apos;s types and state, add and compare them in cents,
          and turn them into money only to show them, with <code>formatMoney</code>. It formats in
          the reader&apos;s locale, from their browser, and in the amount&apos;s currency, USD
          unless you pass the one the API gives.
        </p>
        <CodeBlock
          code={`import { formatMoney } from "@exalynt/design/components";

formatMoney(invoice.amount);                     // 120050 → "$1,200.50"
formatMoney(total, { rounded: true });           // 3800000000 → "$38,000,000"
formatMoney(fee, { currency: invoice.currency }); // the currency the API sent`}
        />
      </Guidance>

      <Example title="Cents in, money out">
        <SectionCard disableContentPadding>
          <DataTable columns={sampleColumns} rows={samples} rowKey={(row) => row.note} />
        </SectionCard>
      </Example>

      <Rules
        title="Every amount"
        items={[
          "Is cents from the API until it's shown, and shown with formatMoney. Never divide by 100 and call toFixed, or put a $ in front by hand.",
          "Is added up, compared and sorted in cents. Where a sum can land between cents, as a percentage or a split does, round once, at the end, with Math.round.",
          "Never hard-codes a locale. The reader's browser decides how the number is written; the data decides the currency.",
          "Shows its cents, except a headline figure in a StatCard or a chart, where rounded drops them. Never round an amount someone pays or is owed.",
          "Sits right-aligned in a table, with tabular-nums on the column's sx, so the digits line up down it.",
          "Shows a credit or refund with its minus sign, and a label that says what it is. Color alone doesn't.",
        ]}
      />

      <Example title="A headline figure, rounded">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <StatCard
              label="Billed this year"
              value={formatMoney(3800000000, { rounded: true })}
              hint="Across 42 invoices"
              accent
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <StatCard
              label="Outstanding"
              value={formatMoney(120050)}
              hint="One invoice, due Nov 7"
            />
          </Grid>
        </Grid>
      </Example>

      <Guidance title="Taking an amount">
        <p>
          An amount field is a <code>TextField</code> with{" "}
          <code>inputMode: &quot;decimal&quot;</code> and the currency&apos;s symbol as its start
          adornment, as in <a href="#Forms">Forms</a>. <code>parseMoney</code> turns what was typed
          into cents for the API. It works from the digits as text, so it never meets a float, and
          ignores commas and spaces. It&apos;s <code>null</code> when the text isn&apos;t an amount,
          or has more decimals than the currency, so the field can say what to fix.
        </p>
        <CodeBlock
          code={`const cents = parseMoney(text); // "1,200.50" → 120050, "12.345" → null
if (cents === null) setError("Enter an amount like 1,200.50, with at most two decimals.");`}
        />
      </Guidance>

      <Example title="An amount field">
        <AmountField />
      </Example>
    </>
  );
}
