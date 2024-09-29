import { useEffect, useState } from "react";
import Header from "@components/all/Header";
import SearchBar from "@/components/group/SearchBar";
import CardList from "@/components/group/CardList";
import LoadMoreButton from "@/components/group/LoadMoreButton";
import { getGroups } from "@/utils/api";

// const getFilteredList = () => {
//   const compare = (a, b) => {
//     if (filter.order === "createdAt") {
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     }
//     return b[filter.order] - a[filter.order];
//   };
//   if (filter.search === "") {
//     return mockData
//       .filter((group) => group.isPublic === filter.isPublic)
//       .sort(compare);
//   }
//   return mockData
//     .filter(
//       (group) =>
//         group.isPublic === filter.isPublic &&
//         group.name.toLowerCase().includes(filter.search.toLowerCase())
//     )
//     .sort(compare);
// };
// const filteredList = getFilteredList();

export default function Main() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [filter, setFilter] = useState({
    isPublic: true,
    search: "",
    order: "mostLiked",
  });

  const handleLoad = async (options) => {
    let result;
    try {
      result = await getGroups(options);
    } catch (error) {
      console.log(error);
    }
    const { currentPage, totalPages, data } = result;
    if (currentPage === 1) {
      setData(data);
    } else {
      setData((prevData) => [...prevData, ...data]);
    }
    setPage(currentPage + 1);
    if (currentPage === totalPages) setDisabled(true);
    console.log(data);
  };

  const handleLoadMore = () => {
    handleLoad({
      page,
      sortBy: filter.order,
      isPublic: filter.isPublic,
      keyword: filter.search,
    });
  };

  useEffect(() => {
    handleLoad({
      sortBy: filter.order,
      isPublic: filter.isPublic,
      keyword: filter.search,
    });
  }, [filter]);

  return (
    <>
      <Header button />
      <SearchBar setFilter={setFilter} />
      <CardList variant="group" cards={data} />
      <LoadMoreButton disabled={disabled} onClick={handleLoadMore} />
    </>
  );
}
