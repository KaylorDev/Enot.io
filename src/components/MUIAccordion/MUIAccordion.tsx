import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { ItemsWrapper, Separator, Title, TitleAndText, Text } from "./style";
import { useDispatch } from "react-redux";
import {
  ChangeCompletedField,
  CreateTodo,
  DeleteDate,
} from "../../store/reducers/todoReducer";
import { MUISwitch } from "../../ui/switch/switch";
import { useMemo, useState } from "react";
import { getRandomColor } from "../../misc/getRandomColor";
import { CheckboxWithLabel } from "../../ui/сheckboxes/CheckboxWithLabel";
import { Button, TextField } from "@mui/material";

type TAccordionProps = {
  toDoId: number;
  date: string;
  elements: IToDoElement[];
};

type TMUIAccordionItemProps = {
  element: IToDoElement;
  index: number;
};

export function MUIAccordion({ date, elements, toDoId }: TAccordionProps) {
  const [opened, setOpened] = useState(false);
  const [isCreateFormOpened, setIsCreateFormOpened] = useState(false);
  const [newTodo, setNewTodo] = useState<TNewToDoElement>({
    title: "",
    text: "",
    completed: false,
    color: getRandomColor(),
  });

  const dispatch = useDispatch();

  const title = useMemo(() => {
    return getTitleByDate(date);
  }, [date]);

  function getTitleByDate(date: string) {
    const dateObj = new Date();
    const dateOffset = 24 * 60 * 60 * 1000;
    const today = dateObj.toLocaleDateString("ru");
    const tomorrow = new Date(
      dateObj.getTime() - dateOffset
    ).toLocaleDateString();

    if (date === today) return "Today tasks";
    if (tomorrow === date) return "Tomorrow tasks";

    return `${date} tasks`;
  }

  function create(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    toDoId: number
  ) {
    e.preventDefault();
    dispatch(CreateTodo({ data: newTodo, id: toDoId }));
    setIsCreateFormOpened(false);
    setNewTodo({
      title: "",
      text: "",
      completed: false,
      color: getRandomColor(),
    });
  }

  function remove(id: number) {
    dispatch(DeleteDate({ id: id }));
  }

  function MUIAccordionItem({ element, index }: TMUIAccordionItemProps) {
    const { id, title, text, completed, color } = element;

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Separator color={color} />
        <TitleAndText>
          <Title completed={completed}>{title}</Title>
          <Text>{text}</Text>
        </TitleAndText>
        <MUISwitch
          onChange={() =>
            dispatch(ChangeCompletedField({ objectId: toDoId, itemId: id }))
          }
          checkedIcon={<CheckCircleIcon htmlColor="white" />}
          icon={<HighlightOffIcon />}
          checked={completed}
          sx={{
            marginLeft: "auto",
            "& .MuiSwitch-track": {
              backgroundColor: "#366EFF",
              borderRadius: 26 / 2,
              opacity: 1,
            },
            ".MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#10C200",
              opacity: 1,
            },
          }}
        />
      </div>
    );
  }

  return (
    <Accordion
      expanded={opened}
      onChange={() => setOpened((opened) => !opened)}
      disableGutters
      sx={{
        marginRight: "10px",
        backgroundColor: "#282828",
        color: "white",
        "& .MuiAccordionSummary-content": {
          alignItems: "center",
          borderRadius: "40px",
        },
      }}
    >
      {!opened ? (
        <AccordionSummary
          expandIcon={
            <ExpandCircleDownIcon color="action" style={{ color: "white" }} />
          }
        >
          <div
            style={{ marginLeft: "-10px" }}
            onClick={(e) => {
              e.stopPropagation();
              remove(toDoId);
            }}
          >
            <DeleteIcon htmlColor="#681c23" />
          </div>
          <Separator color="#A9A9A9" />
          {title}
        </AccordionSummary>
      ) : (
        <CheckboxWithLabel
          formControlsx={{ marginLeft: "4px" }}
          label={title}
          setOpened={setOpened}
        />
      )}
      <AccordionDetails>
        <ItemsWrapper>
          {elements.map((element, i) => (
            <MUIAccordionItem key={element.id} element={element} index={i} />
          ))}
          {isCreateFormOpened ? (
            <>
              <TextField
                color="secondary"
                variant="standard"
                label="Title"
                sx={{
                  "& input": { color: "white" },
                  "& label": { color: "white" },
                }}
                value={newTodo.title}
                onChange={(e) => {
                  setNewTodo({ ...newTodo, title: e.target.value });
                }}
                size="small"
              />
              <TextField
                color="secondary"
                variant="standard"
                label="Text"
                sx={{
                  "& input": { color: "white" },
                  "& label": { color: "white" },
                }}
                value={newTodo.text}
                onChange={(e) => {
                  setNewTodo({ ...newTodo, text: e.target.value });
                }}
                size="small"
              />
              <div style={{ display: "flex", gap: 10 }}>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  color="secondary"
                  onClick={(e) => create(e, toDoId)}
                >
                  ADD
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  color="secondary"
                  onClick={() => setIsCreateFormOpened(false)}
                >
                  CANCEL
                </Button>
              </div>
            </>
          ) : (
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => setIsCreateFormOpened(true)}
            >
              <AddIcon />
            </Button>
          )}
        </ItemsWrapper>
      </AccordionDetails>
    </Accordion>
  );
}
