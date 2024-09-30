import Header from "@components/all/Header";
import GroupDetail from "@components/group/detail/GroupDetail";
import SearchBar from "@/components/group/shared/SearchBar";
import CardList from "@/components/group/shared/CardList";
import LoadMoreButton from "@/components/group/shared/LoadMoreButton";
import PageLayout from "../components/group/shared/PageLayout";

export default function Group() {
  return (
    <PageLayout>
      <Header />
      <GroupDetail />
      <SearchBar variant="memory" />
      <CardList variant="memory" cards={[]} />
      <LoadMoreButton disabled />
    </PageLayout>
  );
}
