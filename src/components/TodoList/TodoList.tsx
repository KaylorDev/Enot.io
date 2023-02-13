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
import useTranslate from "../../hooks/useTranslate";

export function TodoList() {
  const todos = useSelector((state: IState) => state.todos);
  const { newsStatus } = useSelector((state: IState) => state.settings);
  const [openSettings, setOpenSettings] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [news, setNews] = useState(null);
  const settingsIconReg = useRef(null);
  const popperRef = useRef(null);
  const translate = useTranslate();

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
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <>
          <CreateForm close={() => setIsModalOpen(false)} />
        </>
      </Modal>
      <ContentWrapper>
        <Header>
          <HeaderTitle>{translate("To Do")}</HeaderTitle>
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
          {todos.map((todo) => (
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
          {translate("Create new date")}
        </Button>
        {newsStatus && (
          <Marquee>
            <Article>
              {news
                ? news
                : "Апи ключ поддерживает только 100 запросов за 24 часа, сори ;)"}
            </Article>
          </Marquee>
        )}
      </ContentWrapper>
    </Main>
  );
}
