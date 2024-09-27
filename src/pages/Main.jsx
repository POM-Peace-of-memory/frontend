import { useState } from "react";
import Header from "@components/all/Header";
import SearchBar from "@/components/group/SearchBar";
import CardList from "@/components/group/CardList";

const mockData = [
  {
    id: 1,
    name: "에델바이스",
    imageUrl:
      "https://kukka-2-media-123.s3.amazonaws.com/media/contents/event_template/7f9e2405-0bcb-41b5-a8fd-a49873d6692c.jpg",
    isPublic: true,
    likeCount: 1500,
    badgeCount: 2,
    postCount: 8,
    createdAt: "2023-01-01T07:47:49.803Z",
    introduction: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
  },
  {
    id: 2,
    name: "바위솔",
    // imageUrl: "https://example.com/images/sedum.jpg",
    imageUrl: "",
    isPublic: true,
    likeCount: 800,
    badgeCount: 4,
    postCount: 12,
    createdAt: "2023-02-15T09:20:30.003Z",
    introduction: "바위처럼 굳건히 함께하는 정원사들의 모임입니다.",
  },
  {
    id: 3,
    name: "구절초",
    // imageUrl: "https://example.com/images/gujeolcho.jpg",
    imageUrl: "",
    isPublic: false,
    likeCount: 230,
    badgeCount: 1,
    postCount: 5,
    createdAt: "2023-03-10T10:55:15.100Z",
    introduction: "자연과 함께하는 삶을 추구하는 소박한 사람들의 모임입니다.",
  },
  {
    id: 4,
    name: "라벤더",
    // imageUrl: "https://example.com/images/lavender.jpg",
    imageUrl: "",
    isPublic: true,
    likeCount: 1200,
    badgeCount: 6,
    postCount: 25,
    createdAt: "2023-05-20T14:12:40.200Z",
    introduction: "평온한 향기 속에서 마음을 나누는 힐링 그룹입니다.",
  },
  {
    id: 5,
    name: "안개꽃",
    // imageUrl: "https://example.com/images/babysbreath.jpg",
    imageUrl: "",
    isPublic: false,
    likeCount: 560,
    badgeCount: 3,
    postCount: 9,
    createdAt: "2023-07-05T11:30:45.890Z",
    introduction: "작지만 소중한 순간들을 기록하는 안개꽃 모임입니다.",
  },
  {
    id: 6,
    name: "장미",
    // imageUrl: "https://example.com/images/rose.jpg",
    imageUrl: "",
    isPublic: false,
    likeCount: 450,
    badgeCount: 2,
    postCount: 15,
    createdAt: "2023-09-01T16:25:10.123Z",
    introduction: "내면의 아름다움을 가꾸는 비공개 모임입니다.",
  },
  {
    id: 7,
    name: "선인장",
    // imageUrl: "https://example.com/images/cactus.jpg",
    imageUrl: "",
    isPublic: false,
    likeCount: 320,
    badgeCount: 1,
    postCount: 6,
    createdAt: "2023-10-12T12:45:30.456Z",
    introduction: "가시 속에서 피어나는 단단한 모임, 선인장입니다.",
  },
];

export default function Main() {
  const [isPublic, setIsPublic] = useState(true);
  return (
    <>
      <Header button />
      <SearchBar isPublic={isPublic} setIsPublic={setIsPublic} />
      <CardList isPublic={isPublic} variant="group" cards={mockData} />
    </>
  );
}
