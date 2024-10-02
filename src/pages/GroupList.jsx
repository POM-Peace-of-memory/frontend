import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGroups } from "@/utils/api";
import { useLoadData } from "@/hooks/useLoadData";
import PageLayout from "@/components/group/shared/PageLayout";
import Header from "@components/all/Header";
import SearchBar from "@/components/group/shared/SearchBar";
import CardList from "@/components/group/shared/CardList";
import LoadMoreButton from "@/components/group/shared/LoadMoreButton";

export default function GroupList() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("register");
  };

  const { data, page, disabled, filter, setFilter, handleLoad } =
    useLoadData(getGroups);

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
    <PageLayout>
      <Header button buttonHandler={handleRegister} />
      <SearchBar variant="group" setFilter={setFilter} />
      <CardList variant="group" cards={data} />
      <LoadMoreButton disabled={disabled} onClick={handleLoadMore} />
    </PageLayout>
  );
}
