import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { TodoList } from "./components/TodoList/TodoList";
import "./index.css";
import store from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <TodoList />
  </Provider>
);
