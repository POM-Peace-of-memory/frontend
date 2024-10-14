import { useState, useEffect } from "react";
import { calculateDDay, formatNumber } from "@/utils/utils";
import { getGroupDetails, addLike } from "@/utils/api";
import { useNavigate } from "react-router-dom";
import styles from "./GroupDetail.module.css";
import Badge from "@components/badges/Badge";
import Button from "@components/all/Button";
import GroupSetup from "@components/group/shared/GroupSetup";
import DeleteModal from "@components/group/detail/DeleteModal";
import flower from "@assets/flower.svg";
import XIcon from "@assets/xIcon.svg";

const INITIAL_VALUE = {
  id: 0,
  name: "",
  imageUrl: "",
  isPublic: true,
  likeCount: 0,
  badges: [],
  postCount: 0,
  createdAt: new Date(),
  introduction: "",
};

export default function GroupDetail({ groupId }) {
  const [groupData, setGroupData] = useState(INITIAL_VALUE);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/feed");
  };

  const handleEditClick = () => {
    setEditOpen(true);
  };

  const handleDeleteClick = () => {
    setDeleteOpen(true);
  };

  const handleLikeClick = async () => {
    const prevCount = groupData.likeCount;
    await addLike(groupId);
    setGroupData((prev) => ({
      ...prev,
      likeCount: prevCount + 1,
    }));
  };

  const handleLoad = async () => {
    const result = await getGroupDetails(groupId);
    setGroupData(result);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
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
              <button onClick={handleEditClick}>그룹 정보 수정하기</button>
              <button onClick={handleDeleteClick}>그룹 삭제하기</button>
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
      <div className={styles.line}></div>
      <div className={styles.memoryHeader}>
        <div></div>
        <span className="typo-24-bold">추억 목록</span>
        <Button size="small" onClick={handleUploadClick}>
          추억 올리기
        </Button>
      </div>
      {editOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              className={styles.closeButton}
              onClick={() => {
                setEditOpen(false);
              }}
            >
              <img src={XIcon} alt="닫기" />
            </button>
            <GroupSetup
              variant="edit"
              initialValue={groupData}
              groupId={groupId}
            />
          </div>
        </div>
      )}
      {deleteOpen && (
        <DeleteModal handleModal={setDeleteOpen} groupId={groupId} />
      )}
    </>
  );
}
