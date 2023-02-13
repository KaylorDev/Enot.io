import { ContentWrapper, Title } from "./style";
import {
  changeLocale,
  setSettingsNews,
} from "../../../store/reducers/settingsReducer";
import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel, Switch } from "@mui/material";
import useTranslate from "../../../hooks/useTranslate";
import { ReactComponent as RuIcon } from "../../../icons/ru.svg";
import { ReactComponent as EnIcon } from "../../../icons/en.svg";

export function SettingsPopper() {
  const dispatch = useDispatch();
  const translate = useTranslate();
  const { newsStatus } = useSelector((state: IState) => state.settings);

  return (
    <ContentWrapper>
      <Title>{translate("Settings")}</Title>
      <FormControlLabel
        sx={{ marginLeft: 0 }}
        labelPlacement="start"
        label={translate("Show news")}
        control={
          <Switch
            checked={newsStatus}
            onChange={() => dispatch(setSettingsNews())}
          />
        }
      />
      {translate("Language")}
      <div style={{ display: "flex", gap: 5 }}>
        <RuIcon
          width="34"
          height="34"
          style={{ border: "1px solid black", cursor: "pointer" }}
          onClick={() => dispatch(changeLocale("ru-RU"))}
        />
        <EnIcon
          width="34"
          height="34"
          style={{ border: "1px solid black", cursor: "pointer" }}
          onClick={() => dispatch(changeLocale("en-EN"))}
        />
      </div>
    </ContentWrapper>
  );
}
