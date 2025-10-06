import { Autocomplete, TextField } from "@mui/material";

interface ListInputProps<T> {
  isEditable: boolean;
  currentOption: NonNullable<T>;
  options: T[];
  filterOptions: (options: T[], state: any) => T[];
  getOptionLabel: (option: T) => string;
  groupBy: (option: T) => string;
  isOptionEqualToValue: (option: T, value: T) => boolean;
  onChange?: (exerciseParams: T | null) => void;
}

export function ListInput<T>({
  isEditable,
  currentOption,
  options,
  filterOptions,
  getOptionLabel,
  groupBy,
  onChange,
  isOptionEqualToValue,
}: ListInputProps<T>) {
  return (
    <div>
      <Autocomplete<T, false, true, false>
        disabled={!isEditable}
        value={currentOption}
        onChange={(_, newValue) => {
          if (onChange) {
            onChange(newValue as T);
          }
        }}
        options={options}
        filterOptions={filterOptions}
        groupBy={groupBy}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        popupIcon={null}
        disableClearable={true}
        sx={{
          width: 200,
          "&.Mui-disabled": {
            color: "black",
            WebkitTextFillColor: "black",
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            sx={{
              "& .MuiInput-root:before, & .MuiInput-root:after": {
                display: "none",
              },
              "& .MuiInputBase-input": {
                fontFamily: "'Roboto Condensed', sans-serif",
                fontSize: "1rem",
              },
            }}
          />
        )}
        slotProps={{
          paper: {
            sx: {
              // выпадающий список
              fontFamily: "'Roboto Condensed', sans-serif",
              fontSize: "14px",
            },
          },
          listbox: {
            sx: {
              fontFamily: "'Roboto Condensed', sans-serif",
              fontSize: "14px",
            },
          },
          popper: {
            sx: {
              "& .MuiAutocomplete-option": {
                fontFamily: "'Roboto Condensed', sans-serif",
                fontSize: "14px",
              },
            },
          },
        }}
      />
    </div>
  );
}
