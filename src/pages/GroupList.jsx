import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGroups } from "@/utils/api";
import { useLoadData } from "@/hooks/useLoadData";
import PageLayout from "@/components/group/shared/PageLayout";
import Header from "@components/all/Header";
import SearchBar from "@/components/group/shared/SearchBar";
import CardList from "@/components/group/shared/CardList";
import LoadMoreButton from "@/components/group/shared/LoadMoreButton";

export default function GroupList() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("register");
  };

  const { data, page, disabled, filter, setFilter, handleLoad, isLoading } =
    useLoadData(getGroups);

  const handleLoadMore = () => {
    handleLoad({
      page,
      sortBy: filter.order,
      isPublic: filter.isPublic,
    });
  };

  useEffect(() => {
    handleLoad({
      sortBy: filter.order,
      isPublic: filter.isPublic,
    });
  }, [filter]);

  const getSearchedList = () => {
    if (search === "") return data;
    return data.filter((group) =>
      group.name.toLowerCase().includes(search.toLowerCase())
    );
  };
  const searchedList = getSearchedList();

  return (
    <PageLayout>
      <Header button buttonHandler={handleRegister} />
      <SearchBar
        variant="group"
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />
      <CardList variant="group" cards={searchedList} isLoading={isLoading} />
      <LoadMoreButton
        disabled={disabled}
        onClick={handleLoadMore}
        isLoading={isLoading}
      />
    </PageLayout>
  );
}
