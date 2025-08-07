import { Context, Todo } from "./types";

export const root = {
  todos: (_: {}, context: Context) => context.todos,
  todo: ({ id }: { id: string }, context: Context) =>
    context.todos.find((todo) => todo.id === id),
  addTodo: ({ title }: { title: string }, context: Context) => {
    const todo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
    };

    const isDuplicate = context.todos.find((todo) => todo.title === title);
    
    if (isDuplicate) throw new Error("Todo already exists");

    context.todos.push(todo);
    return todo;
  },
  toggleTodo: ({ id }: { id: string }, context: Context) => {
    const todo = context.todos.find((todo) => todo.id === id);
    if (!todo) throw new Error("Todo not found");
    todo.completed = !todo.completed;
    return todo;
  },
  deleteTodo: ({ id }: { id: string }, context: Context) => {
    const index = context.todos.findIndex((todo) => todo.id === id);
    if (index === -1) return false;
    context.todos.splice(index, 1);
    return true;
  },
};
