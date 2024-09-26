import { useState } from "react";
import Header from "@components/all/Header";
import SearchBar from "@/components/group/SearchBar";
import CardList from "@/components/group/CardList";

const mockData = [
  {
    id: 1,
    name: "string",
  },
  {
    id: 2,
    name: "string",
  },
  {
    id: 3,
    name: "string",
  },
  {
    id: 4,
    name: "string",
  },
  {
    id: 5,
    name: "string",
  },
];

export default function Main() {
  const [isPublic, setIsPublic] = useState(true);
  return (
    <>
      <Header button />
      <SearchBar isPublic={isPublic} setIsPublic={setIsPublic} />
      <CardList isPublic={isPublic} variant="group" cards={[]} />
    </>
  );
}
