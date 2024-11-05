import styles from "./LoadingCard.module.css";

export default function LoadingCard() {
  return (
    <div className={styles.container}>
      <div className={styles.skeletonCard}>
        <div className={styles.skeletonImage}></div>
        <div className={styles.skeletonBox}></div>
        <div className={styles.skeletonBox} style={{ width: "80%" }}></div>
      </div>
    </div>
  );
}
