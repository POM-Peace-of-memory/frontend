import { useState } from "react";
import styles from "./SearchBar.module.css";
import search from "@/assets/search.svg";

const ToggleButton = () => {
  const [isPublic, setIsPublic] = useState(true);

  const setButtonClass = (buttonState) => {
    return `typo-14-bold ${styles.toggleButton} ${
      isPublic === buttonState ? styles.toggleSelected : ""
    }`.trim();
  };

  return (
    <div className={styles.toggleContainer}>
      <button
        className={setButtonClass(true)}
        onClick={() => {
          setIsPublic(true);
        }}
      >
        공개
      </button>
      <button
        className={setButtonClass(false)}
        onClick={() => {
          setIsPublic(false);
        }}
      >
        비공개
      </button>
    </div>
  );
};

const SearchInput = () => {
  return (
    <div className={styles.searchInput}>
      <div>
        <img src={search} alt="검색" />
      </div>
      <input type="text" placeholder="그룹명을 검색해 주세요" />
    </div>
  );
};

const FilterDropdown = () => {
  return (
    <select className={`typo-14-regular ${styles.filterDropdown}`}>
      <option>공감순</option>
      <option>최신순</option>
      <option>댓글순</option>
    </select>
  );
};

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <ToggleButton />
      <SearchInput />
      <FilterDropdown />
    </div>
  );
};

export default SearchBar;
