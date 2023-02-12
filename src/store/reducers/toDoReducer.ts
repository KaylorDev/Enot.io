import { ActionCreator, AnyAction } from "redux";

const initialState: IToDoObject[] = [
  {
    id: 1,
    date: "09.02.2023",
    elements: [
      {
        title: "Починить айпад",
        text: "Сходить к мастеру и починить айпад",
        completed: true,
        id: 1,
      },
      {
        title: "Сходить к врачу",
        text: "В 12 кабинет завтра утром",
        completed: false,
        id: 2,
      },
    ],
  },
  {
    id: 2,
    date: "08.02.2023",
    elements: [
      {
        title: "Починить айпад",
        text: "Сходить к мастеру и починить айпад",
        completed: false,
        id: 1,
      },
      {
        title: "Сходить к врачу",
        text: "В 12 кабинет завтра утром",
        completed: false,
        id: 2,
      },
    ],
  },
  {
    id: 3,
    date: "07.02.2023",
    elements: [
      {
        title: "Починить айпад",
        text: "Сходить к мастеру и починить айпад",
        completed: false,
        id: 1,
      },
      {
        title: "Сходить к врачу",
        text: "В 12 кабинет завтра утром",
        completed: false,
        id: 2,
      },
    ],
  },
  {
    id: 4,
    date: "06.02.2023",
    elements: [
      {
        title: "Починить айпад",
        text: "Сходить к мастеру и починить айпад",
        completed: false,
        id: 1,
      },
      {
        title: "Сходить к врачу",
        text: "В 12 кабинет завтра утром",
        completed: false,
        id: 2,
      },
    ],
  },
  {
    id: 5,
    date: "05.02.2023",
    elements: [
      {
        title: "Починить айпад",
        text: "Сходить к мастеру и починить айпад",
        completed: false,
        id: 1,
      },
      {
        title: "Сходить к врачу",
        text: "В 12 кабинет завтра утром",
        completed: false,
        id: 2,
      },
    ],
  },
  {
    id: 6,
    date: "04.02.2023",
    elements: [
      {
        title: "Починить айпад",
        text: "Сходить к мастеру и починить айпад",
        completed: false,
        id: 1,
      },
      {
        title: "Сходить к врачу",
        text: "В 12 кабинет завтра утром",
        completed: false,
        id: 2,
      },
    ],
  },
  {
    id: 7,
    date: "03.02.2023",
    elements: [
      {
        title: "Починить айпад",
        text: "Сходить к мастеру и починить айпад",
        completed: false,
        id: 1,
      },
      {
        title: "Сходить к врачу",
        text: "В 12 кабинет завтра утром",
        completed: false,
        id: 2,
      },
    ],
  },
  {
    id: 8,
    date: "02.02.2023",
    elements: [
      {
        title: "Починить айпад",
        text: "Сходить к мастеру и починить айпад",
        completed: false,
        id: 1,
      },
      {
        title: "Сходить к врачу",
        text: "В 12 кабинет завтра утром",
        completed: false,
        id: 2,
      },
    ],
  },
  {
    id: 9,
    date: "01.01.2023",
    elements: [
      {
        title: "Починить айпад",
        text: "Сходить к мастеру и починить айпад",
        completed: false,
        id: 1,
      },
      {
        title: "Сходить к врачу",
        text: "В 12 кабинет завтра утром",
        completed: false,
        id: 2,
      },
    ],
  },
];

export const ChangeCompleted: ActionCreator<{
  type: string;
  payload: { objectId: number; itemId: number };
}> = (payload) => {
  return { type: "CHANGE_COMPLETED", payload: payload };
};

export const CreateNewTodo: ActionCreator<{
  type: string;
  payload: { data: TNewToDoElement; id: number };
}> = (payload) => {
  return { type: "CREATE_TODO", payload: payload };
};

export const CreateNewDate: ActionCreator<{
  type: string;
  payload: TNewToDoObject;
}> = (payload) => {
  return { type: "CREATE_DATE", payload: payload };
};

export const DeleteDate: ActionCreator<{
  type: string;
  payload: { id: number };
}> = (payload) => {
  return { type: "DELETE_DATE", payload: payload };
};

export function toDoReducer(state = initialState, action: AnyAction) {
  let newState = [...state];

  switch (action.type) {
    case "CHANGE_COMPLETED":
      const index = newState.findIndex(
        (element) => element.id === action.payload.objectId
      );

      const itemIndex = newState[index].elements.findIndex(
        (element) => element.id === action.payload.itemId
      );

      newState[index].elements[itemIndex].completed =
        !newState[index].elements[itemIndex].completed;

      return newState;
    case "CREATE_TODO":
      newState = [...state];
      const indexToPush = newState.findIndex(
        (el) => el.id === action.payload.id
      );

      const maxToDoId =
        newState[indexToPush].elements.length > 0
          ? newState[indexToPush].elements.reduce((prev, current) => {
              if (+current.id > +prev.id) {
                return current;
              } else {
                return prev;
              }
            }).id
          : 0;

      newState[indexToPush].elements.push({
        ...action.payload.data,
        id: maxToDoId + 1,
      });

      return newState;
    case "CREATE_DATE":
      newState = [...state];
      const maxElementId =
        newState.length > 0
          ? newState.reduce((prev, current) => {
              if (+current.id > +prev.id) {
                return current;
              } else {
                return prev;
              }
            }).id
          : 0;

      newState.unshift({
        ...action.payload,
        id: maxElementId + 1,
      });

      return newState;
    case "DELETE_DATE":
      newState = [...state];

      const dateIndexForDelete = newState.findIndex(
        (el) => el.id === action.payload
      );
      delete newState[dateIndexForDelete];
      return newState;
    default:
      return state;
  }
}
