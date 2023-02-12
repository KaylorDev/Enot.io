import { combineReducers, legacy_createStore as createStore } from "redux";
import { settingsReducer } from "./reducers/settingsReducer";
import { todoReducer } from "./reducers/todoReducer";

const rootReducer = combineReducers({
  todos: todoReducer,
  settings: settingsReducer,
});

const store = createStore(rootReducer);

export default store;
