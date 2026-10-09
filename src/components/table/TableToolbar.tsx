import { useId, useState, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

/*
 * What narrows a table, above it, as in the console's lists: a search, and the
 * filters (SearchSelects, usually) in a section under it that the Filters button opens and closes. The
 * button counts the filters in use, so a closed section still says the table
 * is narrowed. `summary` sits at the top right: how many rows there are.
 * Sorting isn't here: a table sorts from its headings.
 */
export function TableToolbar({
  search,
  onSearchChange,
  searchPlaceholder,
  filters,
  filtersInUse,
  onClearFilters,
  summary,
}: {
  /** Left out, there's no search box. */
  search?: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  /** The filters; left out, there's no Filters button. */
  filters?: ReactNode;
  filtersInUse: number;
  onClearFilters: () => void;
  summary?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const sectionId = useId();

  return (
    <>
      {/* A gap rather than spacing, whose margins would override the summary's ml: auto. */}
      <Stack direction="row" useFlexGap sx={{ alignItems: "center", gap: 1.5, p: 2 }}>
        {search !== undefined ? (
          <TextField
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            sx={{ flex: 1, maxWidth: 400 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: search ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      aria-label="Clear search"
                      onClick={() => onSearchChange("")}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
          />
        ) : null}
        {filters ? (
          <Button
            variant="outlined"
            color={filtersInUse > 0 ? "primary" : "inherit"}
            startIcon={<FilterListIcon />}
            endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            aria-expanded={open}
            aria-controls={sectionId}
            onClick={() => setOpen(!open)}
            sx={{ flexShrink: 0 }}
          >
            {filtersInUse > 0 ? `Filters · ${filtersInUse}` : "Filters"}
          </Button>
        ) : null}
        <Box
          sx={{
            ml: "auto",
            display: { xs: "none", sm: "block" },
            color: "text.secondary",
            typography: "body2",
            whiteSpace: "nowrap",
          }}
        >
          {summary}
        </Box>
      </Stack>
      {filters ? (
        <Collapse in={open} id={sectionId}>
          <Stack
            direction="row"
            useFlexGap
            sx={{ flexWrap: "wrap", alignItems: "center", gap: 1.5, px: 2, pb: 2 }}
          >
            {filters}
            {filtersInUse > 0 ? <Button onClick={onClearFilters}>Clear filters</Button> : null}
          </Stack>
        </Collapse>
      ) : null}
    </>
  );
}
