import styles from "./GroupCard.module.css";
import flower from "@/assets/flower.svg";

export default function GroupCard({ id }) {
  return (
    <div className={styles.groupCard}>
      <div className={styles.groupImg}>
        <img src={flower} alt="그룹이미지" />
      </div>
      <div className={styles.statesContainer}>
        <span className="typo-14-regular">D+265</span>
        <span className="typo-14-regular">|</span>
        <span className="typo-14-regular">공개</span>
      </div>
      <div className={styles.titleContainer}>
        <span className="typo-16-bold">에델바이스</span>
        <span>서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.</span>
      </div>
      <div className={styles.counterContainer}>
        <div className={styles.badgeCount}>
          <span className="typo-12-regular">획득 배지</span>
          <span className="typo-14-regular">2</span>
        </div>
        <div className={styles.postCount}>
          <span className="typo-12-regular">추억</span>
          <span className="typo-14-regular">8</span>
        </div>
        <div className={styles.likeCount}>
          <span className="typo-12-regular">그룹 공감</span>
          <div>
            <img src={flower} alt="공감" />
            <span className="typo-14-regular">1.5K</span>
          </div>
        </div>
      </div>
    </div>
  );
}
