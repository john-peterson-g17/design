import Chip from "@mui/material/Chip";
import type { Column } from "../components";

/* Made-up invoices for the table demos and guidelines. */

export type Invoice = {
  number: string;
  project: string;
  client: string;
  /** ISO date, so it sorts as text. */
  issued: string;
  amount: number;
  status: "Paid" | "Due" | "Overdue";
};

const PROJECTS = [
  "Billing migration",
  "Mobile app",
  "Data warehouse",
  "Customer portal",
  "Search revamp",
  "Payments API",
];
const CLIENTS = ["Acme Corp", "Globex", "Initech", "Umbrella"];

export const invoices: Invoice[] = Array.from({ length: 32 }, (_, i) => ({
  number: `INV-${String(101 + i).padStart(4, "0")}`,
  project: PROJECTS[i % PROJECTS.length],
  client: CLIENTS[(i * 3) % CLIENTS.length],
  issued: new Date(Date.UTC(2026, 0, 5 + i * 4)).toISOString().slice(0, 10),
  amount: 1200 + ((i * 7919) % 40) * 200,
  status: i % 5 === 0 ? "Overdue" : i % 3 === 0 ? "Due" : "Paid",
}));

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const day = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

const statusColor = { Paid: "success", Due: "warning", Overdue: "error" } as const;

export const invoiceColumns: Column<Invoice>[] = [
  {
    id: "number",
    header: "Invoice",
    value: (row) => row.number,
    sortable: true,
    hideBelow: "sm",
  },
  { id: "project", header: "Project", value: (row) => row.project, sortable: true },
  { id: "client", header: "Client", value: (row) => row.client, sortable: true, hideBelow: "md" },
  {
    id: "issued",
    header: "Issued",
    value: (row) => row.issued,
    render: (row) => day.format(new Date(row.issued)),
    sortable: true,
    hideBelow: "sm",
  },
  {
    id: "status",
    header: "Status",
    value: (row) => row.status,
    render: (row) => (
      <Chip label={row.status} size="small" variant="outlined" color={statusColor[row.status]} />
    ),
    sortable: true,
  },
  {
    id: "amount",
    header: "Amount",
    align: "right",
    value: (row) => row.amount,
    render: (row) => money.format(row.amount),
    sortable: true,
  },
];
