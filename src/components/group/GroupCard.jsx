import { calculateDDay, formatNumber } from "@/utils/utils";
import styles from "./GroupCard.module.css";
import flower from "@/assets/flower.svg";

export default function GroupCard({ card }) {
  const renderPrivateCard = () => {
    return (
      <div className={styles.groupCard} style={{ height: "156px" }}>
        <div className={styles.statesContainer}>
          <span className="typo-14-regular">{`D+${calculateDDay(
            card.createdAt
          )}`}</span>
          <span className="typo-14-regular">|</span>
          <span className="typo-14-regular">비공개</span>
        </div>
        <div className={styles.titleContainer}>
          <span className="typo-16-bold">{card.name}</span>
        </div>
        <div className={styles.counterContainer}>
          <div className={styles.postCount}>
            <span className="typo-12-regular">추억</span>
            <span className="typo-14-regular">{card.postCount}</span>
          </div>
          <div className={styles.likeCount}>
            <span className="typo-12-regular">그룹 공감</span>
            <div>
              <img src={flower} alt="공감" />
              <span className="typo-14-regular">
                {formatNumber(card.likeCount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPublicCard = () => {
    return (
      <div className={styles.groupCard}>
        {card.imageUrl === "" ? (
          <div className={styles.groupImg}>
            <img src={flower} alt="그룹이미지" />
          </div>
        ) : (
          <img
            className={styles.groupImg}
            src={card.imageUrl}
            alt="그룹이미지"
          />
        )}
        <div className={styles.statesContainer}>
          <span className="typo-14-regular">{`D+${calculateDDay(
            card.createdAt
          )}`}</span>
          <span className="typo-14-regular">|</span>
          <span className="typo-14-regular">공개</span>
        </div>
        <div className={styles.titleContainer}>
          <span className="typo-16-bold">{card.name}</span>
          <span>{card.introduction}</span>
        </div>
        <div className={styles.counterContainer}>
          <div className={styles.badgeCount}>
            <span className="typo-12-regular">획득 배지</span>
            <span className="typo-14-regular">{card.badgeCount}</span>
          </div>
          <div className={styles.postCount}>
            <span className="typo-12-regular">추억</span>
            <span className="typo-14-regular">{card.postCount}</span>
          </div>
          <div className={styles.likeCount}>
            <span className="typo-12-regular">그룹 공감</span>
            <div>
              <img src={flower} alt="공감" />
              <span className="typo-14-regular">
                {formatNumber(card.likeCount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <>{card.isPublic ? renderPublicCard() : renderPrivateCard()}</>;
}
