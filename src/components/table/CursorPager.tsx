import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { PagerBar, PagerRange } from "./TablePager";

export type CursorPagerProps = {
  /** Zero-based: how many pages the reader has moved forward from the first. */
  page: number;
  pageSize: number;
  /** The rows on this page, which can be fewer than `pageSize` on the last. */
  count: number;
  /** Whether the server gave a cursor to a next page. */
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  /** Called with the new size. Start again from the first page, as the cursors are for the old one. */
  onPageSizeChange: (size: number) => void;
  /** The page sizes offered. */
  pageSizes?: number[];
  /** Names a row and rows, for the range: "Invoices 26–50". */
  noun: { one: string; other: string };
  /** A page is on its way: both arrows wait for it. */
  loading?: boolean;
};

/*
 * A DataTable's footer when the server pages its rows by cursor: previous and
 * next, rather than numbered pages, since a cursor can only step to the page
 * beside it and the server doesn't say how many there are. The caller holds
 * the cursors, fetches each page, and keeps the ones behind it to step back.
 * It's the same footer as ListTable's numbered one, so the two read alike.
 */
export function CursorPager({
  page,
  pageSize,
  count,
  hasNext,
  onPrevious,
  onNext,
  onPageSizeChange,
  pageSizes = [10, 25, 50],
  noun,
  loading = false,
}: CursorPagerProps) {
  const from = page * pageSize + 1;
  const label = noun.other.charAt(0).toUpperCase() + noun.other.slice(1);

  return (
    <PagerBar
      summary={
        count === 0 ? (
          `No ${noun.other}`
        ) : (
          <>
            {label} <PagerRange from={from} to={from + count - 1} />
          </>
        )
      }
      pageSize={pageSize}
      pageSizes={pageSizes}
      onPageSizeChange={onPageSizeChange}
    >
      {page > 0 || hasNext ? (
        <Stack component="nav" aria-label="Pages" direction="row" sx={{ gap: 0.5 }}>
          <PaginationItem
            type="previous"
            size="small"
            shape="rounded"
            aria-label="Previous page"
            disabled={loading || page === 0}
            onClick={onPrevious}
          />
          <PaginationItem
            type="next"
            size="small"
            shape="rounded"
            aria-label="Next page"
            disabled={loading || !hasNext}
            onClick={onNext}
          />
        </Stack>
      ) : null}
    </PagerBar>
  );
}
