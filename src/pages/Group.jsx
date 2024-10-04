import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getPosts } from "@/utils/api";
import { useLoadData } from "@/hooks/useLoadData";
import Header from "@components/all/Header";
import GroupDetail from "@components/group/detail/GroupDetail";
import SearchBar from "@/components/group/shared/SearchBar";
import CardList from "@/components/group/shared/CardList";
import LoadMoreButton from "@/components/group/shared/LoadMoreButton";
import PageLayout from "@components/group/shared/PageLayout";

export default function Group() {
  const { groupId } = useParams();

  const { data, page, disabled, filter, setFilter, handleLoad } =
    useLoadData(getPosts);

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
      <Header />
      <GroupDetail groupId={groupId} />
      <SearchBar variant="memory" setFilter={setFilter} />
      <CardList variant="memory" cards={data} />
      <LoadMoreButton disabled={disabled} onClick={handleLoadMore} />
    </PageLayout>
  );
}
