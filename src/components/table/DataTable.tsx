import type { KeyboardEvent, ReactNode } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import type { SxProps, Theme } from "@mui/material/styles";

export type SortDirection = "asc" | "desc";

export type TableSort = { column: string; direction: SortDirection };

/** One column: its heading, its cells, and whether its heading sorts the table. */
export type Column<T> = {
  id: string;
  header: ReactNode;
  /** The cell's raw value: shown when there's no `render`, and what ListTable searches and sorts by. */
  value?: (row: T) => string | number;
  /** Draws the cell, for anything richer than the value as text. */
  render?: (row: T) => ReactNode;
  /** Lets the heading sort the table. */
  sortable?: boolean;
  align?: "left" | "right";
  /** Hides the column below this breakpoint: a secondary column a phone can do without. */
  hideBelow?: "sm" | "md";
  /** Styles for this column's cells. */
  sx?: SxProps<Theme>;
};

export type DataTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  /** Makes every row interactive (to open it, say): it highlights on hover, takes focus, and Enter activates it. */
  onRowClick?: (row: T) => void;
  /** The current order, drawn on its column's heading. Applying it to `rows` is the caller's job. */
  sort?: TableSort | null;
  /** Called with a sortable column's id when its heading is clicked. */
  onSort?: (column: string) => void;
  /** Shades every other row so a wide row is easy to follow. On by default. */
  striped?: boolean;
  /** Raises the theme's minimum width for a table with more columns than it fits. */
  minWidth?: number;
};

/*
 * Rows as a table, described by columns rather than written out cell by cell,
 * so every table shares one header, stripe and hover treatment. It holds no
 * state of its own: sorting is drawn from `sort` and reported through
 * `onSort`, so the rows can come from anywhere, a server included. ListTable
 * wraps it with search, filters, sorting and pagination done in memory.
 *
 * It scrolls inside its own container when it's wider than the screen. A
 * column with `hideBelow` drops out on smaller screens instead, and while one
 * does, the table lets go of the theme's minimum width so what's left fits.
 */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  onRowClick,
  sort,
  onSort,
  striped = true,
  minWidth,
}: DataTableProps<T>) {
  const hides = columns.some((column) => column.hideBelow);

  function cellSx(column: Column<T>): SxProps<Theme> {
    const hide = column.hideBelow
      ? { display: { xs: "none", [column.hideBelow]: "table-cell" } }
      : {};
    return [hide, ...(Array.isArray(column.sx) ? column.sx : [column.sx])];
  }

  function onRowKeyDown(event: KeyboardEvent, row: T) {
    if (event.key === "Enter" && event.target === event.currentTarget) onRowClick?.(row);
  }

  return (
    <TableContainer>
      <Table
        sx={(theme) => ({
          minWidth,
          ...(hides && { [theme.breakpoints.down("sm")]: { minWidth: 0 } }),
        })}
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              const active = sort?.column === column.id;
              const direction = active ? sort.direction : "asc";
              return (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sortDirection={active ? direction : false}
                  sx={cellSx({ ...column, sx: undefined })}
                >
                  {column.sortable && onSort ? (
                    <TableSortLabel
                      active={active}
                      direction={direction}
                      onClick={() => onSort(column.id)}
                    >
                      {column.header}
                    </TableSortLabel>
                  ) : (
                    column.header
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody sx={(theme) => bodySx(theme, striped)}>
          {rows.map((row) => (
            <TableRow
              key={rowKey(row)}
              hover={onRowClick !== undefined}
              tabIndex={onRowClick ? 0 : undefined}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              onKeyDown={onRowClick ? (event) => onRowKeyDown(event, row) : undefined}
            >
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} sx={cellSx(column)}>
                  {column.render ? column.render(row) : column.value?.(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/*
 * Stripes are a faint wash of the text color, so they hold up in either mode
 * and under any theme. A row that does something gets a brand-tinted wash on
 * hover instead, a clear step up from a stripe, and a focus ring for the
 * keyboard. The last row drops its border, so a table in a card doesn't draw
 * a second line against the card's edge.
 */
function bodySx(theme: Theme, striped: boolean) {
  const { text, primary } = theme.vars.palette;
  return {
    ...(striped && {
      "& .MuiTableRow-root:nth-of-type(even)": {
        backgroundColor: `rgba(${text.primaryChannel} / 3%)`,
      },
    }),
    "& .MuiTableRow-root.MuiTableRow-hover": { cursor: "pointer" },
    "& .MuiTableRow-root.MuiTableRow-hover:hover": {
      backgroundColor: `rgba(${primary.mainChannel} / 8%)`,
    },
    "& .MuiTableRow-root.MuiTableRow-hover:focus-visible": {
      outline: `2px solid ${primary.main}`,
      outlineOffset: -2,
    },
    "& .MuiTableRow-root:last-of-type > .MuiTableCell-root": { borderBottom: 0 },
  };
}
