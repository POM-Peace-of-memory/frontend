import Header from "@components/all/Header";
import SearchBar from "../components/main/SearchBar";
import LoadMoreButton from "../components/main/LoadMoreButton";

export default function Main() {
  return (
    <>
      <Header button={true} />
      <SearchBar />
      <LoadMoreButton />
    </>
  );
}
