import { useState, useEffect } from "react";
import { getGroupDetails, addLike } from "@/utils/api";
import { useNavigate } from "react-router-dom";
import styles from "./GroupDetail.module.css";
import Button from "@components/all/Button";
import GroupSetup from "@components/group/shared/GroupSetup";
import DeleteModal from "@components/group/detail/DeleteModal";
import DetailLoading from "@/components/group/detail/DetailLoading";
import XIcon from "@assets/xIcon.svg";
import GroupProfile from "./GroupProfile";

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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/feed");
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
    setIsLoading(true);
    let result;
    try {
      result = await getGroupDetails(groupId);
      setGroupData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  if (isLoading) return <DetailLoading />;

  return (
    <>
      <GroupProfile
        groupData={groupData}
        setEditOpen={setEditOpen}
        setDeleteOpen={setDeleteOpen}
        handleLikeClick={handleLikeClick}
      />
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
