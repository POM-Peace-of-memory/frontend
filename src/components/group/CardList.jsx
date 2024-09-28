import empty from "@assets/empty.svg";
import Button from "@components/all/Button";
import GroupCard from "@/components/group/GroupCard";
import styles from "./CardList.module.css";

const CardList = ({ variant, cards }) => {
  const getEmptyStateText = () => {
    if (variant === "group")
      return {
        mainText: "등록된 그룹이 없습니다.",
        subText: "가장 먼저 그룹을 만들어보세요!",
      };
    else if (variant === "memory")
      return {
        mainText: "게시된 추억이 없습니다.",
        subText: "첫 번째 추억을 올려보세요!",
      };
  };

  const renderEmptyState = () => {
    const { mainText, subText } = getEmptyStateText();
    return (
      <div className={styles.emptyList}>
        <div className={styles.emptyImg}>
          <img src={empty} alt="데이터없음" />
        </div>
        <div className={styles.emptyDescription}>
          <span className="typo-18-bold">{mainText}</span>
          <span className="typo-14-regular">{subText}</span>
        </div>
        <Button>{variant === "group" ? "그룹 만들기" : "추억 올리기"}</Button>
      </div>
    );
  };

  const renderCards = () => (
    <div className={styles.cardList}>
      <div className={styles.cardGrid}>
        {cards.map((card) => (
          <GroupCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );

  return <>{cards.length === 0 ? renderEmptyState() : renderCards()}</>;
};

export default CardList;
