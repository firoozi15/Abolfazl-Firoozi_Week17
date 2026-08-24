import styles from "./Header.module.css";
import searchIcon from "../assets/icons/search.svg";
import closeIcon from "../assets/icons/close.svg";

import { useContext } from "react";
import { ContactsContext } from "../context/ContactsContext.jsx";

function Header() {
  const { searchValue, setSearchValue, clearSearch } =
    useContext(ContactsContext);
  return (
    <>
      <header className={styles.header}>
        <img
          src={searchIcon}
          alt="searchicon"
          className={`${styles.icon} ${styles.searchIcon}`}
        />
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <img
          src={closeIcon}
          alt="searchicon"
          className={`${styles.icon} ${styles.closeIcon} ${searchValue && styles.showCloseIcon}`}
          onClick={clearSearch}
        />
      </header>
    </>
  );
}

export default Header;
