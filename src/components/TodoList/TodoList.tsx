import {
  Article,
  ContentWrapper,
  Header,
  HeaderTitle,
  Main,
  Marquee,
  ScrollableContent,
} from "./style";
import SettingsIcon from "@mui/icons-material/Settings";
import { MUIAccordion } from "../MUIAccordion/MUIAccordion";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { MUIPopper } from "../../ui/popper/MUIPopper";
import { SettingsPopper } from "./SettingPopper/SettingPopper";
import { useOnClickOutside } from "../../hooks/useClickOutsideComponent";
import { getNews } from "../../api/newsService";
import { getRandomInt } from "../../misc/getRandomNumber";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { CreateForm } from "./CreateForm/CreateForm";

export function TodoList() {
  const toDos = useSelector((state: IState) => state.todos);
  const { newsStatus } = useSelector((state: IState) => state.settings);
  const [openSettings, setOpenSettings] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [news, setNews] = useState(null);
  const settingsIconReg = useRef(null);
  const popperRef = useRef(null);

  useOnClickOutside(popperRef, () => setOpenSettings(false));

  useEffect(() => {
    getNews().then((response) =>
      setNews(
        response.articles[getRandomInt(0, response.articles.length - 1)]
          .description
      )
    );
  }, []);

  return (
    <Main>
      <Modal
        children={<CreateForm />}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      ></Modal>
      <ContentWrapper>
        <Header>
          <HeaderTitle>To Do</HeaderTitle>
          <SettingsIcon
            ref={settingsIconReg}
            onClick={() => setOpenSettings(!openSettings)}
            sx={{ color: "#F4F4F4", cursor: "pointer" }}
          />
          <MUIPopper
            popperRef={popperRef}
            open={openSettings}
            content={<SettingsPopper />}
            anchorEl={settingsIconReg.current}
          />
        </Header>
        <ScrollableContent>
          {toDos.map((todo) => (
            <MUIAccordion
              key={todo.id}
              toDoId={todo.id}
              date={todo.date}
              elements={todo.elements}
            />
          ))}
        </ScrollableContent>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setIsModalOpen(true)}
        >
          Add new date
        </Button>
        {newsStatus && news && (
          <Marquee>
            <Article>{news}</Article>
          </Marquee>
        )}
      </ContentWrapper>
    </Main>
  );
}
