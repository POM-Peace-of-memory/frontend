import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGroups } from "@/utils/api";
import MainLayout from "../components/group/MainLayout";
import Header from "@components/all/Header";
import SearchBar from "@/components/group/SearchBar";
import CardList from "@/components/group/CardList";
import LoadMoreButton from "@/components/group/LoadMoreButton";

export default function Main() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [filter, setFilter] = useState({
    isPublic: true,
    search: "",
    order: "mostLiked",
  });
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

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
    if (currentPage !== totalPages) setDisabled(false);
    else setDisabled(true);
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
    <MainLayout>
      <Header button buttonHandler={handleRegister} />
      <SearchBar setFilter={setFilter} />
      <CardList variant="memory" cards={data} />
      <LoadMoreButton disabled={disabled} onClick={handleLoadMore} />
    </MainLayout>
  );
}
