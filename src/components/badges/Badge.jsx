import styles from "./Badge.module.css";
const badges = [
  "👾 7일 연속 추억 등록",
  "🌼 그룹 공감 1만 개 이상 받기",
  "💖 게시글 공감 1만 개 이상 받기",
];

export default function Badge() {
  return (
    <div className={styles.badgeContainer}>
      <span className="typo-16-bold">획득 배지</span>
      <div className={`typo-16-medium ${styles.badgeList}`}>
        <div className={styles.badge}>{badges[0]}</div>
        <div className={styles.badge}>{badges[1]}</div>
        <div className={styles.badge}>{badges[2]}</div>
        <div className={styles.badge}>{badges[2]}</div>
      </div>
    </div>
  );
}
