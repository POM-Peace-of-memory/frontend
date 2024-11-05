import { useNavigate } from "react-router-dom";
import empty from "@assets/empty.svg";
import styles from "./CardList.module.css";
import Button from "@components/all/Button";
import GroupCard from "@components/group/main/GroupCard";
import MemoryCard from "@/components/group/detail/MemoryCard";
import LoadingCard from "@/components/group/shared/LoadingCard";

const emptyStateText = {
  group: {
    mainText: "등록된 그룹이 없습니다.",
    subText: "가장 먼저 그룹을 만들어보세요!",
  },
  memory: {
    mainText: "게시된 추억이 없습니다.",
    subText: "첫 번째 추억을 올려보세요!",
  },
};

const CardList = ({ variant, cards, isLoading }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (variant === "group") navigate("register");
    else navigate("/feed");
  };

  const renderEmptyState = () => {
    return (
      <div
        style={variant === "memory" ? { marginTop: "120px" } : {}}
        className={styles.emptyList}
      >
        <div className={styles.emptyImg}>
          <img src={empty} alt="데이터없음" />
        </div>
        <div className={styles.emptyDescription}>
          <span className="typo-18-bold">
            {emptyStateText[variant].mainText}
          </span>
          <span className="typo-14-regular">
            {emptyStateText[variant].subText}
          </span>
        </div>
        <Button onClick={handleButtonClick}>
          {variant === "group" ? "그룹 만들기" : "추억 올리기"}
        </Button>
      </div>
    );
  };

  const renderCards = () => (
    <div className={styles.cardList}>
      <div className={styles.cardGrid}>
        {cards.map((card) =>
          variant === "group" ? (
            <GroupCard key={card.id} card={card} />
          ) : (
            <MemoryCard key={card.id} card={card} />
          )
        )}
      </div>
    </div>
  );

  return (
    <>
      {cards.length === 0 ? (
        isLoading ? (
          <LoadingCard />
        ) : (
          renderEmptyState()
        )
      ) : (
        renderCards()
      )}
    </>
  );
};

export default CardList;
