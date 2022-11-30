import Header from "components/Header/Header";
import TodoList from "components/TodoList/TodoList";
import TodoPresenter from "components/TodoList/todo_presenter";
import { DarkModeProvider } from "context/DarkModeContext";
import { useState } from "react";

type AppProps = {
  present: TodoPresenter;
};
export type Filter = "all" | "active" | "completed";
const filters: Filter[] = ["all", "active", "completed"];

function App({ present }: AppProps) {
  const [filter, setFilter] = useState<Filter>("all");

  return (
    <DarkModeProvider>
      <Header filters={filters} filter={filter} onFilterChange={setFilter} />
      <TodoList present={present} filter={filter} />
    </DarkModeProvider>
  );
}

export default App;
