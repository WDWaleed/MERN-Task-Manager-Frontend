import { TodoHead } from "./TodoHead";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";

export const TodoContainer = () => {
  return (
    <section className="mx-auto w-full max-w-[545px] -translate-y-275 p-8">
      <TodoHead />
      <TodoForm />
      <TodoList />
    </section>
  );
};
