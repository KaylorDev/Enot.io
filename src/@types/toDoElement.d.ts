interface IToDoElement {
  id: number;
  title: string;
  text: string;
  completed: boolean;
  color: string;
}

interface IToDoObject {
  id: number;
  date: string;
  elements: IToDoElement[];
}

type TNewToDoObject = Omit<IToDoObject, "id">;

type TNewToDoElement = Omit<IToDoElement, "id">;
