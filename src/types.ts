export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface Context {
  todos: Todo[];
}
