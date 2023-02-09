import { combineReducers, legacy_createStore as createStore } from "redux";
import { settingsReducer } from "./reducers/settingsReducer";
import { toDoReducer } from "./reducers/toDoReducer";

const rootReducer = combineReducers({
  todos: toDoReducer,
  settings: settingsReducer,
});

const store = createStore(rootReducer);

export default store;
