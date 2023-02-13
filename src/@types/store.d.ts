interface IState {
  todos: IToDoObject[];
  settings: { newsStatus: boolean; locale: TLocale };
}
