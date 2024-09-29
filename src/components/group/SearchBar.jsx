import { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";
import searchIcon from "@/assets/search.svg";

const ToggleButton = ({ isPublic, updateisPublic }) => {
  const setButtonClass = (buttonState) => {
    return `typo-14-bold ${styles.toggleButton} ${
      isPublic === buttonState ? styles.toggleSelected : ""
    }`.trim();
  };

  return (
    <div className={styles.toggleContainer}>
      <button
        className={setButtonClass(true)}
        onClick={() => updateisPublic(true)}
      >
        공개
      </button>
      <button
        className={setButtonClass(false)}
        onClick={() => updateisPublic(false)}
      >
        비공개
      </button>
    </div>
  );
};

const SearchInput = ({ search, updateSearch }) => {
  const onChangeSearch = (e) => {
    updateSearch(e.target.value);
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

const FilterDropdown = ({ updateOrder }) => {
  const onChangeSelect = (e) => {
    updateOrder(e.target.value);
  };
  return (
    <select
      onChange={onChangeSelect}
      className={`typo-14-regular ${styles.filterDropdown}`}
    >
      <option value="mostLiked">공감순</option>
      <option value="latest">최신순</option>
      <option value="mostPosted">추억순</option>
      <option value="mostBadge">뱃지순</option>
    </select>
  );
};

const SearchBar = ({ setFilter }) => {
  const [isPublic, setIsPublic] = useState(true);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("likeCount");

  const updateisPublic = (state) => {
    setIsPublic(state);
    setFilter((prev) => ({ ...prev, isPublic: state }));
  };

  const updateSearch = (state) => {
    setSearch(state);
    setFilter((prev) => ({ ...prev, search: state }));
  };

  const updateOrder = (state) => {
    setOrder(state);
    setFilter((prev) => ({ ...prev, order: state }));
  };
  return (
    <div className={styles.searchBar}>
      <ToggleButton isPublic={isPublic} updateisPublic={updateisPublic} />
      <SearchInput search={search} updateSearch={updateSearch} />
      <FilterDropdown updateOrder={updateOrder} />
    </div>
  );
};

export default SearchBar;
