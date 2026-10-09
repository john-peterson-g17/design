import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/*
 * A table's footer when it's paged: which rows are showing on the left, and
 * the page size and numbered pages on the right. On a phone the size picker
 * goes, and the pages wrap under the range if they don't fit beside it.
 */
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
        <Typography
          component="span"
          variant="inherit"
          sx={{ color: "text.primary", fontWeight: 600 }}
        >
          {from}–{to}
        </Typography>{" "}
        of {total} {total === 1 ? noun.one : noun.other}
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
      </Stack>
    </Stack>
  );
}
