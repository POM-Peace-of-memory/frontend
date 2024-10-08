import { Link } from "react-router-dom";
import { formatNumber, formatMoment } from "@/utils/utils";
import styles from "./MemoryCard.module.css";
import flower from "@/assets/flower.svg";
import comment from "@/assets/comment.svg";

export default function MemoryCard({ card }) {
  console.log(card);
  const renderPrivateCard = () => {
    return (
      <div className={styles.memoryCard} style={{ height: "142px" }}>
        <div className={styles.statesContainer}>
          <span className="typo-14-regular">{card.nickname}</span>
          <span className="typo-14-regular">|</span>
          <span className="typo-14-regular">비공개</span>
        </div>
        <div className={styles.titleContainer}>
          <span className="typo-16-bold">{card.title}</span>
        </div>
        <div className={styles.counterContainer}>
          <div className={styles.likeCount}>
            <img src={flower} alt="공감" />
            <span className="typo-14-regular">
              {formatNumber(card.likeCount)}
            </span>
          </div>
          <div className={styles.commentCount}>
            <img src={comment} alt="댓글" />
            <span className="typo-14-regular">{card.commentCount}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderPublicCard = () => {
    return (
      <div className={styles.memoryCard}>
        <img
          className={styles.memoryImg}
          src={card.imageUrl}
          alt="추억이미지"
        />
        <div className={`typo-14-regular ${styles.statesContainer}`}>
          <span>{card.nickname}</span>
          <span>|</span>
          <span>공개</span>
        </div>
        <div className={styles.titleContainer}>
          <span className="typo-16-bold">{card.title}</span>
          <div className={styles.memoryTag}>
            {card.tags.map((tag, idx) => (
              <span className="typo-14-regular" key={idx}>{` ${tag}`}</span>
            ))}
          </div>
        </div>
        <div className={styles.cardBottom}>
          <div className={`typo-12-regular ${styles.memoryLog}`}>
            <span>{card.location}</span>
            <span>·</span>
            <span>{formatMoment(card.moment)}</span>
          </div>
          <div className={styles.counterContainer}>
            <div className={styles.likeCount}>
              <img src={flower} alt="공감" />
              <span className="typo-14-regular">
                {formatNumber(card.likeCount)}
              </span>
            </div>
            <div className={styles.commentCount}>
              <img src={comment} alt="댓글" />
              <span className="typo-14-regular">{card.commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Link to="/detail" className={styles.groupLink}>
      {card.isPublic ? renderPublicCard() : renderPrivateCard()}
    </Link>
  );
}
