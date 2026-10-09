import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { Theme } from "@mui/material/styles";
import { DataTable, ListTable, SectionCard, formatMoney } from "../../components";
import { CursorPagedInvoices } from "../../components/table/CursorPager.demo";
import { CodeBlock } from "../CodeBlock";
import { Example } from "../Example";
import { Guidance } from "../Guidance";
import { invoiceColumns, invoices } from "../invoices";
import { Rules } from "./Rules";

const rows = invoices.slice(0, 4);

/* Every column kept, so the table is wider than a phone and scrolls. */
const allColumns = invoiceColumns.map((column) => ({ ...column, hideBelow: undefined }));

const statusColor = { Paid: "success", Due: "warning", Overdue: "error" } as const;

/* The structure changes below sm, so this is the one place for useMediaQuery. */
function InvoiceRows() {
  const phone = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  if (!phone) return <DataTable columns={allColumns} rows={rows} rowKey={(row) => row.number} />;
  return (
    <List disablePadding>
      {rows.map((invoice) => (
        <ListItem key={invoice.number} divider sx={{ gap: 2, px: 2 }}>
          <ListItemText
            primary={invoice.project}
            secondary={`${invoice.number} · ${invoice.client}`}
          />
          <Stack spacing={0.5} sx={{ alignItems: "flex-end", flexShrink: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {formatMoney(invoice.amount)}
            </Typography>
            <Chip
              label={invoice.status}
              size="small"
              variant="outlined"
              color={statusColor[invoice.status]}
            />
          </Stack>
        </ListItem>
      ))}
    </List>
  );
}

export function TablesGuideline() {
  return (
    <>
      <Rules
        title="Every table"
        items={[
          "Is a DataTable, or a ListTable when people need to find rows in it. Search, filters, sorting and pagination are each one prop on ListTable.",
          "Has striped rows. A row that opens something takes onRowClick, so it highlights on hover and works from the keyboard.",
          "Scrolls inside its own container on a narrow screen, so the page never scrolls sideways. The theme's 560px minimum width stops columns squeezing to one word per line.",
          "On phones, either hides its secondary columns with hideBelow, or becomes a list of rows as cards. Use the list when each row is read on its own, and scrolling when people compare across rows.",
          "Inside a SectionCard, uses disableContentPadding so it runs to the card's edges. ListTable brings its own card.",
          "Pages its rows where they're held. Rows the app has in full get ListTable's numbered pages; rows a server pages by cursor get a DataTable with a CursorPager under it.",
        ]}
      />

      <Example title="Scrolls inside its container (the default)">
        <SectionCard title="Invoices" disableContentPadding>
          <DataTable columns={allColumns} rows={rows} rowKey={(row) => row.number} />
        </SectionCard>
      </Example>

      <Example title="Secondary columns hide on smaller screens (open the phone preview)">
        <SectionCard title="Invoices" disableContentPadding>
          <DataTable columns={invoiceColumns} rows={rows} rowKey={(row) => row.number} />
        </SectionCard>
      </Example>
      <CodeBlock
        code={`{ id: "client", header: "Client", value: (row) => row.client, hideBelow: "md" },
{ id: "issued", header: "Issued", value: (row) => row.issued, hideBelow: "sm" },`}
      />

      <Example title="Rows become cards below sm (open the phone preview)">
        <SectionCard title="Invoices" disableContentPadding>
          <InvoiceRows />
        </SectionCard>
      </Example>
      <CodeBlock
        code={`const phone = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
return phone ? <List>…</List> : <DataTable … />;`}
      />

      <Guidance title="Paging">
        <p>
          How a table pages follows from where its rows are. When the app has every row, as a short
          list does, <a href="#ListTable">ListTable</a>&apos;s <code>pagination</code> numbers the
          pages and can jump to any of them, since it knows the total.
        </p>
        <p>
          When the server pages the rows by cursor, as long or growing lists do, each page comes
          with a cursor to the next, and nothing says how many pages there are. Put a{" "}
          <a href="#CursorPager">CursorPager</a> under a <a href="#DataTable">DataTable</a>: it
          steps back and forward one page at a time, and the page keeps the cursors it has used so
          Previous can return to them.
        </p>
      </Guidance>

      <Example title="Numbered pages: rows the app has in full">
        <ListTable
          title="Invoices"
          noun={{ one: "invoice", other: "invoices" }}
          columns={invoiceColumns}
          rows={invoices}
          rowKey={(row) => row.number}
          pagination
        />
      </Example>
      <CodeBlock
        code={`<ListTable title="Invoices" noun={noun} columns={columns} rows={invoices} rowKey={(row) => row.number} pagination />`}
      />

      <Example title="Previous and next: rows a server pages by cursor">
        <CursorPagedInvoices />
      </Example>
      <CodeBlock
        code={`<SectionCard title="Invoices" disableContentPadding>
  <DataTable columns={columns} rows={data.items} rowKey={(row) => row.id} />
  <Divider />
  <CursorPager page={page} pageSize={pageSize} count={data.items.length} hasNext={data.nextCursor !== null} … />
</SectionCard>`}
      />
    </>
  );
}
