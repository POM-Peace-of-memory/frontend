import { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";
import searchIcon from "@/assets/search.svg";

const ToggleButton = ({ isPublic, setIsPublic }) => {
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

const SearchInput = ({ search, setSearch }) => {
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.searchInput}>
      <div>
        <img src={searchIcon} alt="검색" />
      </div>
      <input
        type="text"
        value={search}
        onChange={onChangeSearch}
        placeholder="그룹명을 검색해 주세요"
      />
    </div>
  );
};

const FilterDropdown = ({ setOrder }) => {
  const onChangeSelect = (e) => {
    setOrder(e.target.value);
  };
  return (
    <select
      onChange={onChangeSelect}
      className={`typo-14-regular ${styles.filterDropdown}`}
    >
      <option value="likeCount">공감순</option>
      <option value="createdAt">최신순</option>
      <option value="postCount">추억순</option>
    </select>
  );
};

const SearchBar = ({ setFilter }) => {
  const [isPublic, setIsPublic] = useState(true);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("likeCount");

  useEffect(() => {
    setFilter({ isPublic, search, order });
  }, [isPublic, search, order, setFilter]);

  return (
    <div className={styles.searchBar}>
      <ToggleButton isPublic={isPublic} setIsPublic={setIsPublic} />
      <SearchInput search={search} setSearch={setSearch} />
      <FilterDropdown setOrder={setOrder} />
    </div>
  );
};

export default SearchBar;
