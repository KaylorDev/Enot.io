import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Providers } from "./components/Providers";
import "./index.css";
import store from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Providers />
  </Provider>
);
