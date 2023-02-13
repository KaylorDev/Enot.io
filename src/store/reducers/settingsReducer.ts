import { ActionCreator, AnyAction } from "redux";

const initialState = {
  newsStatus: true,
  locale: "ru-RU",
};

export const setSettingsNews: ActionCreator<{
  type: string;
}> = () => {
  return { type: "CHANGE_NEWS" };
};

export const changeLocale: ActionCreator<{
  type: string;
  payload: TLocale;
}> = (payload) => {
  return { type: "CHANGE_LOCALE", payload: payload };
};

export function settingsReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case "CHANGE_NEWS":
      return { ...state, newsStatus: !state.newsStatus };
    case "CHANGE_LOCALE":
      return { ...state, locale: action.payload };
    default:
      return state;
  }
}
