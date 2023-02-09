import { ContentWrapper, Title } from "./style";
import { setSettingsNews } from "../../../store/reducers/settingsReducer";
import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel, Switch } from "@mui/material";

export function SettingsPopper() {
  const dispatch = useDispatch();
  const { newsStatus } = useSelector((state: IState) => state.settings);

  return (
    <ContentWrapper>
      <Title>Settings</Title>
      <FormControlLabel
        sx={{ marginLeft: 0 }}
        labelPlacement="start"
        label="Показывать новость"
        control={
          <Switch
            checked={newsStatus}
            onChange={() => dispatch(setSettingsNews())}
          />
        }
      ></FormControlLabel>
    </ContentWrapper>
  );
}
