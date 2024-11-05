import { calculateDDay, formatNumber } from "@/utils/utils";
import styles from "./GroupDetail.module.css";
import Badge from "@components/badges/Badge";
import flower from "@assets/flower.svg";

export default function GroupProfile({
  groupData,
  setEditOpen,
  setDeleteOpen,
  handleLikeClick,
}) {
  return (
    <div className={styles.groupDetail}>
      <div className={styles.groupImg}>
        {groupData.imageUrl === "" ? (
          <div className={styles.noneImg}>
            <img src={flower} alt="그룹이미지" />
          </div>
        ) : (
          <img src={groupData.imageUrl} alt="그룹이미지" />
        )}
      </div>
      <div className={styles.groupInfo}>
        <div className={styles.infoContainer}>
          <div className={`typo-16-regular ${styles.groupDatePublic}`}>
            <span>{calculateDDay(groupData.createdAt)}</span>
            <span>|</span>
            <span>{groupData.isPublic ? "공개" : "비공개"}</span>
          </div>
          <div className={`typo-14-regular ${styles.groupUpdateDelete}`}>
            <button onClick={() => setEditOpen(true)}>
              그룹 정보 수정하기
            </button>
            <button onClick={() => setDeleteOpen(true)}>그룹 삭제하기</button>
          </div>
        </div>
        <div className={styles.infoContainer}>
          <div className={`typo-30-bold ${styles.groupTitle}`}>
            {groupData.name}
          </div>
          <div className={`typo-18-bold ${styles.groupPostLike}`}>
            <span>추억 {groupData.postCount}</span>
            <span>|</span>
            <span>그룹 공감 {formatNumber(groupData.likeCount)}</span>
          </div>
        </div>
        <div className={`typo-18-regular ${styles.groupIntroduction}`}>
          {groupData.introduction}
        </div>
        <div className={styles.bagesLikeButton}>
          <Badge badges={groupData.badges} />
          <button onClick={handleLikeClick} className={styles.likeButton}>
            <img src={flower} alt="공감" />
            <span className="typo-16-medium">공감 보내기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
