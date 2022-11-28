import Header from "components/Header/Header";
import TodoList from "components/TodoList/TodoList";
import { DarkModeProvider } from "context/DarkModeContext";
import { useState } from "react";

export type Filter = "all" | "active" | "completed";
const filters: Filter[] = ["all", "active", "completed"];

function App() {
  const [filter, setFilter] = useState<Filter>("all");

  return (
    <DarkModeProvider>
      <Header filters={filters} filter={filter} onFilterChange={setFilter} />
      <TodoList filter={filter} />
    </DarkModeProvider>
  );
}

export default App;
