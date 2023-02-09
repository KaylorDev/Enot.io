import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

type TCheckboxWithLabelProps = {
  label: string;
  setOpened: (opened: boolean) => void;
  formControlsx?: any;
};

export function CheckboxWithLabel({
  label,
  setOpened,
  formControlsx,
}: TCheckboxWithLabelProps) {
  return (
    <FormControlLabel
      sx={formControlsx}
      control={
        <Checkbox sx={{ "&.Mui-checked": { color: "white" } }} defaultChecked />
      }
      label={label}
      labelPlacement="end"
      onChange={() => setOpened(false)}
    />
  );
}
