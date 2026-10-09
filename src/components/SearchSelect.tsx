import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import type { ReactNode } from "react";

export type SearchSelectOption = {
  /** Identifies the option: two options with the same id are the same option. */
  id: string;
  label: string;
  /** A second, quieter line under the label, such as an email or a client. Searched too. */
  description?: string;
  /** The heading it's listed under. Searched too. Keep a group's options together. */
  group?: string;
  /** Shown before the label, such as an Avatar or an icon. */
  icon?: ReactNode;
};

export type SearchSelectProps = {
  label: string;
  options: SearchSelectOption[];
  value: SearchSelectOption | null;
  onChange: (value: SearchSelectOption | null) => void;
  placeholder?: string;
  helperText?: ReactNode;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  /** Says the options are still being fetched, while `options` is empty. */
  loading?: boolean;
  noOptionsText?: ReactNode;
};

/* Case and accents don't matter: "Jose" finds "José". */
function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function wordsOf(text: string) {
  return text.split(/\s+/).filter(Boolean);
}

/* Every word typed has to appear somewhere in the label, description or group,
   in any order, so "sam acme" finds Sam Lee at Acme. */
function filterOptions(options: SearchSelectOption[], { inputValue }: { inputValue: string }) {
  const words = wordsOf(normalize(inputValue));
  return options.filter((option) => {
    const text = normalize([option.label, option.description, option.group].join(" "));
    return words.every((word) => text.includes(word));
  });
}

/* Bolds the typed words where they appear in the label. */
function highlight(label: string, query: string) {
  const words = wordsOf(query).map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!words.length) return label;
  return label.split(new RegExp(`(${words.join("|")})`, "gi")).map((part, index) =>
    index % 2 ? (
      <Box
        key={index}
        component="mark"
        sx={{ bgcolor: "transparent", color: "text.primary", fontWeight: 700 }}
      >
        {part}
      </Box>
    ) : (
      part
    ),
  );
}

/**
 * Picks one option from a list long enough to want searching: people, clients,
 * projects. Typing filters on every word, matches are bolded, and Enter takes
 * the top match.
 */
export function SearchSelect({
  label,
  options,
  value,
  onChange,
  placeholder,
  helperText,
  error,
  required,
  disabled,
  loading,
  noOptionsText = "Nothing matches",
}: SearchSelectProps) {
  const grouped = options.some((option) => option.group);
  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={(_, option) => onChange(option)}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, selected) => option.id === selected.id}
      filterOptions={filterOptions}
      groupBy={grouped ? (option) => option.group ?? "" : undefined}
      autoHighlight
      disabled={disabled}
      loading={loading}
      noOptionsText={noOptionsText}
      renderOption={({ key, ...props }, option, state) => (
        <li key={key} {...props}>
          {option.icon ? (
            <Box sx={{ display: "flex", flexShrink: 0, mr: 1.25, color: "text.secondary" }}>
              {option.icon}
            </Box>
          ) : null}
          <Box sx={{ minWidth: 0 }}>
            {/* Reopening on a chosen value shows the whole list; don't bold its label in every row. */}
            {state.inputValue === value?.label
              ? option.label
              : highlight(option.label, state.inputValue)}
            {option.description ? (
              <Typography
                variant="caption"
                noWrap
                sx={{ display: "block", color: "text.secondary" }}
              >
                {option.description}
              </Typography>
            ) : null}
          </Box>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          helperText={helperText}
          error={error}
          required={required}
          slotProps={{
            ...params.slotProps,
            input: {
              ...params.slotProps.input,
              startAdornment: (
                <InputAdornment position="start" sx={{ ml: 0.5, mr: 0 }}>
                  <SearchIcon sx={{ fontSize: 18 }} />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
}
