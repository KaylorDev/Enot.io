import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ItemsWrapper, Separator, Title, TitleAndText, Text } from "./style";
import { useDispatch } from "react-redux";
import { ChangeCompleted } from "../../store/reducers/toDoReducer";
import { MUISwitch } from "../../ui/switch/switch";
import { useMemo, useState } from "react";
import { getRandomColor } from "../../misc/getRandomColor";
import { CheckboxWithLabel } from "../../ui/сheckboxes/CheckboxWithLabel";
import { Button } from "@mui/material";

type TAccordionProps = {
  toDoId: number;
  date: string;
  elements: IToDoElement[];
};

type TMUIAccordionItemProps = {
  element: IToDoElement;
};

export function MUIAccordion({ date, elements, toDoId }: TAccordionProps) {
  const [opened, setOpened] = useState(false);
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

  function create(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
  }

  function MUIAccordionItem({ element }: TMUIAccordionItemProps) {
    const { id, title, text, completed } = element;

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Separator color={getRandomColor()} />
        <TitleAndText>
          <Title completed={completed}>{title}</Title>
          <Text>{text}</Text>
        </TitleAndText>
        <MUISwitch
          onChange={() =>
            dispatch(ChangeCompleted({ objectId: toDoId, itemId: id }))
          }
          checkedIcon={<CheckCircleIcon htmlColor="white" />}
          icon={<HighlightOffIcon />}
          checked={completed}
          sx={{
            marginLeft: "auto",
            "& .MuiSwitch-track": {
              backgroundColor: completed ? "#366EFF" : "#10C200",
              borderRadius: 26 / 2,
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
          {!opened && <Separator color="#A9A9A9" />}
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
          {elements.map((element) => (
            <MUIAccordionItem key={element.id} element={element} />
          ))}
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={(e) => create(e)}
          >
            +
          </Button>
        </ItemsWrapper>
      </AccordionDetails>
    </Accordion>
  );
}
