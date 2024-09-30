import Header from "@components/all/Header";
import GroupDetail from "@components/group/GroupDetail";
import SearchBar from "@/components/group/SearchBar";
import CardList from "@/components/group/CardList";
import LoadMoreButton from "@/components/group/LoadMoreButton";
import PageLayout from "../components/group/PageLayout";

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
