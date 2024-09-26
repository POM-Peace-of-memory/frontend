import Header from "@components/all/Header";
import SearchBar from "../components/main/SearchBar";
import LoadMoreButton from "../components/main/LoadMoreButton";
import GroupCard from "../components/main/GroupCard";
import CardGrid from "../components/main/CardGrid";

export default function Main() {
  return (
    <>
      <Header button={true} />
      <SearchBar />
      <CardGrid />
    </>
  );
}
