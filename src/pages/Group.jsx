import Header from "@components/all/Header";
import GroupDetail from "@components/group/detail/GroupDetail";
import SearchBar from "@/components/group/shared/SearchBar";
import CardList from "@/components/group/shared/CardList";
import LoadMoreButton from "@/components/group/shared/LoadMoreButton";
import PageLayout from "../components/group/shared/PageLayout";

const mockData = [
  {
    id: 1,
    nickname: "달봉이아들",
    title: "에델바이스 꽃말이 소중한 추억이래요",
    imageUrl: "/src/assets/Image 4.svg",
    tags: [
      "태그",
      "낚시",
      "태그",
      "낚시",
      "태그",
      "낚시",
      "태그",
      "낚시",
      "태그",
      "낚시",
    ],
    location: "인천 앞바다",
    moment: "2024-02-21",
    isPublic: true,
    likeCount: 120,
    commentCount: 8,
    createdAt: "2024-02-22T07:47:49.803Z",
  },
  {
    id: 2,
    nickname: "바다낚시꾼",
    title: "조용한 아침, 대물 히트!",
    imageUrl: "/src/assets/Image 4.svg",
    tags: ["낚시", "바다", "고등어"],
    location: "여수",
    moment: "2024-03-15",
    isPublic: true,
    likeCount: 95,
    commentCount: 12,
    createdAt: "2024-03-16T09:15:22.123Z",
  },
  {
    id: 3,
    nickname: "산책러",
    title: "봄바람과 함께 걸은 한강",
    imageUrl: "/src/assets/Image 4.svg",
    tags: ["산책", "자연", "한강"],
    location: "서울 한강공원",
    moment: "2024-04-05",
    isPublic: false,
    likeCount: 63,
    commentCount: 7,
    createdAt: "2024-04-06T10:30:45.678Z",
  },
  {
    id: 4,
    nickname: "산정상에서",
    title: "태백산 정상의 아침",
    imageUrl: "/src/assets/Image 4.svg",
    tags: ["등산", "태백산", "아침"],
    location: "태백산",
    moment: "2024-05-12",
    isPublic: true,
    likeCount: 88,
    commentCount: 10,
    createdAt: "2024-05-13T06:47:32.456Z",
  },
  {
    id: 5,
    nickname: "나무향기",
    title: "숲 속의 힐링 타임",
    imageUrl: "/src/assets/Image 4.svg",
    tags: ["숲", "자연", "힐링"],
    location: "양평 숲길",
    moment: "2024-06-20",
    isPublic: true,
    likeCount: 74,
    commentCount: 6,
    createdAt: "2024-06-21T11:20:19.789Z",
  },
];

export default function Group() {
  return (
    <PageLayout>
      <Header />
      <GroupDetail />
      <SearchBar variant="memory" />
      <CardList variant="memory" cards={mockData} />
      <LoadMoreButton disabled />
    </PageLayout>
  );
}
