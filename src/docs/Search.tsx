import { useEffect, useState } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import type { PopperProps } from "@mui/material/Popper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { catalog, type Entry } from "./catalog";

type Option = Entry & { group: string };

const options: Option[] = catalog.flatMap((group) =>
  group.entries.map((entry) => ({ ...entry, group: group.title })),
);

/* Matches on the group and the description too, so "dialog" finds ConfirmDialog
   and "card" finds both cards. */
const filterOptions = createFilterOptions<Option>({
  stringify: (option) => `${option.title} ${option.group} ${option.description}`,
});

const isMac = /Mac|iPhone|iPad/.test(navigator.userAgent);
const shortcutLabel = isMac ? "⌘K" : "Ctrl K";

function isTyping(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  );
}

function Kbd({ children }: { children: string }) {
  return (
    <Box
      component="kbd"
      sx={{
        px: 0.75,
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        fontFamily: "inherit",
        fontSize: 12,
        lineHeight: "18px",
        color: "text.secondary",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </Box>
  );
}

/* Renders the results in the dialog under the input, rather than floating. */
function InlineList({ className, role, children }: PopperProps) {
  return (
    <div className={className} role={role}>
      {typeof children === "function" ? null : children}
    </div>
  );
}

function SearchDialog({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (title: string) => void;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-label="Search the design system"
      /* Opens toward the top, as command palettes do, so the list grows down. */
      sx={{ "& .MuiDialog-container": { alignItems: "flex-start" } }}
      slotProps={{ paper: { sx: { mt: { sm: "12vh" } } } }}
    >
      <Autocomplete
        open
        options={options}
        groupBy={(option) => option.group}
        getOptionLabel={(option) => option.title}
        filterOptions={filterOptions}
        value={null}
        onChange={(_, option) => {
          if (!option) return;
          onClose();
          onSelect(option.title);
        }}
        /* Autocomplete keeps Escape from the dialog while its list is open. */
        onClose={(_, reason) => {
          if (reason === "escape") onClose();
        }}
        autoHighlight
        forcePopupIcon={false}
        noOptionsText="Nothing matches"
        slots={{ popper: InlineList }}
        slotProps={{
          paper: { sx: { border: 0, bgcolor: "transparent", boxShadow: "none" } },
          listbox: { sx: { maxHeight: { xs: "60vh", sm: 420 } } },
        }}
        renderOption={({ key, ...props }, option) => (
          <li key={key} {...props}>
            <option.icon sx={{ fontSize: 18, color: "text.secondary", mr: 1.25, flexShrink: 0 }} />
            <Box sx={{ minWidth: 0 }}>
              {option.title}
              <Typography
                variant="caption"
                noWrap
                sx={{ display: "block", color: "text.secondary" }}
              >
                {option.description.replaceAll("`", "")}
              </Typography>
            </Box>
          </li>
        )}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              variant="standard"
              placeholder="Search pages"
              autoFocus
              slotProps={{
                ...params.slotProps,
                input: {
                  ...params.slotProps.input,
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: <Kbd>Esc</Kbd>,
                },
              }}
              sx={{ px: 2, py: 1.5 }}
            />
            <Divider />
          </>
        )}
      />
    </Dialog>
  );
}

/*
 * Jumps to a page by name, from a dialog. ⌘K (Ctrl K elsewhere) opens it from
 * anywhere, even mid-typing; "/" does too, as on GitHub, unless the reader is
 * already typing. The top bar shows it as a search box, or an icon on phones.
 */
export function Search({ onSelect }: { onSelect: (title: string) => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const commandK = event.key.toLowerCase() === "k" && (isMac ? event.metaKey : event.ctrlKey);
      const slash =
        event.key === "/" &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !isTyping(event.target);
      if (!commandK && !slash) return;
      event.preventDefault();
      setOpen((wasOpen) => (commandK ? !wasOpen : true));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <ButtonBase
        onClick={() => setOpen(true)}
        aria-label="Search"
        aria-keyshortcuts={isMac ? "Meta+K /" : "Control+K /"}
        sx={{
          display: { xs: "none", sm: "flex" },
          width: 260,
          height: 36,
          gap: 1,
          px: 1.25,
          justifyContent: "flex-start",
          border: 1,
          borderColor: "divider",
          borderRadius: 1.5,
          bgcolor: "background.default",
          color: "text.secondary",
          fontSize: 14,
          "&:hover": { borderColor: "text.secondary" },
        }}
      >
        <SearchIcon sx={{ fontSize: 18 }} />
        <Box component="span" sx={{ flex: 1, textAlign: "left" }}>
          Search
        </Box>
        <Kbd>{shortcutLabel}</Kbd>
      </ButtonBase>
      <IconButton
        onClick={() => setOpen(true)}
        aria-label="Search"
        sx={{ display: { sm: "none" } }}
      >
        <SearchIcon />
      </IconButton>
      <SearchDialog open={open} onClose={() => setOpen(false)} onSelect={onSelect} />
    </>
  );
}
