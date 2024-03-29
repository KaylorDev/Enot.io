import { Wrapper } from "./style";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { CreateDate } from "../../../store/reducers/toDoReducer";
import useTranslate from "../../../hooks/useTranslate";

export function CreateForm({ close }: { close: () => void }) {
  const todos = useSelector((state: IState) => state.todos);
  const [newDate, setNewDate] = useState("");
  const translate = useTranslate();
  const { locale } = useSelector((state: IState) => state.settings);

  const dates = useMemo(() => {
    return todos.map((todo) => todo.date);
  }, [todos]);
  const dateAlreadyExist = useMemo(() => {
    if (dates.find((date) => date === newDate)) return true;
    return false;
  }, [dates, newDate]);

  const dispatch = useDispatch();

  function create(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const submitData = {
      date: newDate,
      elements: [],
    };

    dispatch(CreateDate(submitData));
    close();
  }

  return (
    <Wrapper>
      {translate("Date")}
      <TextField
        onChange={(e) =>
          setNewDate(new Date(e.currentTarget.value).toLocaleDateString("ru"))
        }
        size="small"
        type={"date"}
      />
      {dateAlreadyExist && locale && (
        <div style={{ color: "red" }}>{translate("Date already exists")}</div>
      )}
      <Button
        variant="contained"
        color="secondary"
        onClick={(e) => create(e)}
        disabled={!Boolean(newDate) || dateAlreadyExist}
      >
        {translate("Create")}
      </Button>
    </Wrapper>
  );
}
