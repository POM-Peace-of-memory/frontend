import styles from "./GroupDetail.module.css";
import loadingStyles from "@/components/group/shared/LoadingCard.module.css";

export default function DetailLoading() {
  return (
    <>
      <div className={styles.groupDetail}>
        <div className={styles.groupImg}>
          <div
            className={loadingStyles.skeletonImage}
            style={{ height: "273px", width: "262px", borderRadius: "6px" }}
          ></div>
        </div>
        <div className={styles.groupInfo}>
          <div className={loadingStyles.skeletonBox}></div>
          <div
            className={loadingStyles.skeletonBox}
            style={{ width: "80%" }}
          ></div>
          <div className={loadingStyles.skeletonBox}></div>
          <div
            className={loadingStyles.skeletonBox}
            style={{ width: "80%" }}
          ></div>
          <div
            className={loadingStyles.skeletonBox}
            style={{ width: "40%" }}
          ></div>
        </div>
      </div>
      <div className={styles.line}></div>
    </>
  );
}
