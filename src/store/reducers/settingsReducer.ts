import { ActionCreator, AnyAction } from "redux";

const initialState = {
  newsStatus: true,
};

export const setSettingsNews: ActionCreator<{
  type: string;
}> = () => {
  return { type: "CHANGE_NEWS" };
};

export function settingsReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case "CHANGE_NEWS":
      const newState = { newsStatus: !state.newsStatus };

      return newState;
    default:
      return state;
  }
}
