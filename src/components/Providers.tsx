import { useSelector } from "react-redux";
import LocaleProvider from "../i18n/Provider";
import { TodoList } from "./TodoList/TodoList";

export function Providers() {
  const { locale } = useSelector((state: IState) => state.settings);

  return (
    <LocaleProvider locale={locale}>
      <TodoList />
    </LocaleProvider>
  );
}
