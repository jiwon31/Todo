import { Filter } from "app/App";
import { useDarkMode } from "context/DarkModeContext";
import { BsFillMoonFill } from "react-icons/bs";
import { IoSunny } from "react-icons/io5";
import styles from "./Header.module.css";

type HeaderProps = {
  filters: Filter[];
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
};

export default function Header({
  filters,
  filter,
  onFilterChange,
}: HeaderProps) {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className={styles.header}>
      <button className={styles.toggle} onClick={toggleDarkMode}>
        {darkMode ? <IoSunny color="white" /> : <BsFillMoonFill />}
      </button>
      <ul className={styles.filters}>
        {filters.map((value, index) => (
          <li key={index}>
            <button
              className={`${styles.filter} ${
                filter === value && styles.selected
              }`}
              onClick={() => onFilterChange(value)}
            >
              {value}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}
