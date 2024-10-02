import { useState, useEffect } from "react";
import { calculateDDay, formatNumber } from "@/utils/utils";
import { getGroupDetails } from "@/utils/api";
import { useNavigate } from "react-router-dom";
import styles from "./GroupDetail.module.css";
import Badge from "@components/badges/Badge";
import Button from "@components/all/Button";
import flower from "@assets/flower.svg";

const INITIAL_VALUE = {
  id: 0,
  name: "",
  imageUrl: "",
  isPublic: true,
  likeCount: 0,
  badges: [],
  postCount: 0,
  createdAt: "",
  introduction: "",
};

export default function GroupDetail({ groupId }) {
  const [groupData, setGroupData] = useState(INITIAL_VALUE);
  // const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/feed");
  };

  useEffect(async () => {
    const result = await getGroupDetails(groupId);
    setGroupData(result);
    console.log(result);
  }, [groupId]);

  return (
    <>
      <div className={styles.groupDetail}>
        <div className={styles.groupImg}>
          <img src={groupData.imageUrl} alt="그룹이미지" />
        </div>
        <div className={styles.groupInfo}>
          <div className={styles.infoContainer}>
            <div className={`typo-16-regular ${styles.groupDatePublic}`}>
              <span>{calculateDDay(groupData.createdAt)}</span>
              <span>|</span>
              <span>{groupData.isPublic ? "공개" : "비공개"}</span>
            </div>
            <div className={`typo-14-regular ${styles.groupUpdateDelete}`}>
              <button>그룹 정보 수정하기</button>
              <button>그룹 삭제하기</button>
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
          <div className={`typo-18-regular ${styles.infoContainer}`}>
            {groupData.introduction}
          </div>
          <div className={styles.bagesLikeButton}>
            <Badge />
            <button className={styles.likeButton}>
              <img src={flower} alt="공감" />
              <span className="typo-16-medium">공감 보내기</span>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.memoryHeader}>
        <div></div>
        <span className="typo-24-bold">추억 목록</span>
        <Button size="small" onClick={handleButton}>
          추억 올리기
        </Button>
      </div>
    </>
  );
}
