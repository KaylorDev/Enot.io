interface IToDoElement {
  id: number;
  title: string;
  text: string;
  completed: boolean;
}

interface IToDoObject {
  id: number;
  date: string;
  elements: IToDoElement[];
}

type TNewToDoObject = Omit<IToDoObject, "id">;
