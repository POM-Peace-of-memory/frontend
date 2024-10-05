import { useState } from "react";
import styles from "./SearchBar.module.css";
import searchIcon from "@/assets/search.svg";

const searchBarText = {
  group: {
    searchText: "그룹명을 검색해 주세요",
    order: [
      ["mostLiked", "공감순"],
      ["latest", "최신순"],
      ["mostPosted", "추억순"],
      ["mostBadge", "뱃지순"],
    ],
  },
  memory: {
    searchText: "태그 혹은 제목을 입력해 주세요",
    order: [
      ["mostLiked", "공감순"],
      ["latest", "최신순"],
      ["mostCommented", "댓글순"],
    ],
  },
};

const ToggleButton = ({ isPublic, updateIsPublic }) => {
  const setButtonClass = (buttonState) => {
    return `typo-14-bold ${styles.toggleButton} ${
      isPublic === buttonState ? styles.toggleSelected : ""
    }`.trim();
  };

  return (
    <div className={styles.toggleContainer}>
      <button
        className={setButtonClass(true)}
        onClick={() => updateIsPublic(true)}
      >
        공개
      </button>
      <button
        className={setButtonClass(false)}
        onClick={() => updateIsPublic(false)}
      >
        비공개
      </button>
    </div>
  );
};

const SearchInput = ({ variant, search, setSearch }) => {
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
        placeholder={searchBarText[variant].searchText}
        className="typo-14-regular"
      />
    </div>
  );
};

const FilterDropdown = ({ variant, updateOrder }) => {
  const onChangeSelect = (e) => {
    updateOrder(e.target.value);
  };
  return (
    <select
      onChange={onChangeSelect}
      className={`typo-14-regular ${styles.filterDropdown}`}
    >
      {searchBarText[variant].order.map((it, idx) => (
        <option key={idx} value={it[0]}>
          {it[1]}
        </option>
      ))}
    </select>
  );
};

const SearchBar = ({ setFilter, variant, search, setSearch }) => {
  const [isPublic, setIsPublic] = useState(true);
  const [order, setOrder] = useState("mostLiked");

  const updateIsPublic = (state) => {
    setIsPublic(state);
    setFilter((prev) => ({ ...prev, isPublic: state }));
  };

  const updateOrder = (state) => {
    setOrder(state);
    setFilter((prev) => ({ ...prev, order: state }));
  };
  return (
    <div className={styles.searchBar}>
      <ToggleButton isPublic={isPublic} updateIsPublic={updateIsPublic} />
      <SearchInput variant={variant} search={search} setSearch={setSearch} />
      <FilterDropdown variant={variant} updateOrder={updateOrder} />
    </div>
  );
};

export default SearchBar;
