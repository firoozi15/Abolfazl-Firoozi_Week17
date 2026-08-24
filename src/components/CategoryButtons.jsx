import styles from "./CategoryButtons.module.css";

import categories from "../constants/categories.js";

import { useContext } from "react";
import { ContactsContext } from "../context/ContactsContext.jsx";

function CategoryButtons() {
  const { setSelectedCategory, selectedCategory } = useContext(ContactsContext);
  return (
    <>
      <div className={styles.filterButtons}>
        <button
          onClick={() => {
            setSelectedCategory("All");
          }}
          className={`${styles.button} ${selectedCategory === "All" && styles.activeFilter}`}
        >
          All
        </button>
        {categories.map((category) => {
          return (
            <button
              key={category.id}
              className={`${styles.button} ${selectedCategory === category.name && styles.activeFilter}`}
              value={category.name}
              onClick={() => {
                setSelectedCategory(category.name);
              }}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default CategoryButtons;
