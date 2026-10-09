import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

/*
 * A paged table's footer: which rows are showing on the left, and the page
 * size and the controls that move between pages on the right. On a phone the
 * size picker goes, and the controls wrap under the range if they don't fit
 * beside it. TablePager and CursorPager each fill in the controls.
 */
export function PagerBar({
  summary,
  pageSize,
  pageSizes,
  onPageSizeChange,
  children,
}: {
  /** Which rows are showing, with the numbers in a PagerRange. */
  summary: ReactNode;
  pageSize: number;
  pageSizes: number[];
  onPageSizeChange: (size: number) => void;
  children: ReactNode;
}) {
  return (
    <Stack
      direction="row"
      useFlexGap
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 1.5,
        px: 2,
        py: 1.5,
      }}
    >
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {summary}
      </Typography>
      <Stack direction="row" useFlexGap sx={{ alignItems: "center", gap: 2 }}>
        <Stack
          direction="row"
          useFlexGap
          sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 1 }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Per page
          </Typography>
          <Select
            size="small"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            inputProps={{ "aria-label": "Rows per page" }}
            sx={{ fontSize: 14, "& .MuiSelect-select": { py: 0.5, pl: 1.25 } }}
          >
            {pageSizes.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        {children}
      </Stack>
    </Stack>
  );
}

/* The rows showing, "26–50", picked out from the words around them. */
export function PagerRange({ from, to }: { from: number; to: number }) {
  return (
    <Typography component="span" variant="inherit" sx={{ color: "text.primary", fontWeight: 600 }}>
      {from}–{to}
    </Typography>
  );
}

/* ListTable's footer: numbered pages over rows it has in full, so it knows the total. */
export function TablePager({
  page,
  pageSize,
  pageSizes,
  total,
  noun,
  onPageChange,
  onPageSizeChange,
}: {
  /** Zero-based. */
  page: number;
  pageSize: number;
  pageSizes: number[];
  total: number;
  noun: { one: string; other: string };
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const from = page * pageSize + 1;
  const to = Math.min(total, (page + 1) * pageSize);

  return (
    <PagerBar
      summary={
        <>
          <PagerRange from={from} to={to} /> of {total} {total === 1 ? noun.one : noun.other}
        </>
      }
      pageSize={pageSize}
      pageSizes={pageSizes}
      onPageSizeChange={onPageSizeChange}
    >
      {pages > 1 ? (
        <Pagination
          count={pages}
          page={page + 1}
          onChange={(_, next) => onPageChange(next - 1)}
          shape="rounded"
          color="primary"
          size="small"
          siblingCount={0}
        />
      ) : null}
    </PagerBar>
  );
}
