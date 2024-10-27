import { useState } from "react";
import styles from "./DeleteModal.module.css";
import Button from "@components/all/Button";
import OkModal from "@components/group/shared/OkModal";
import XIcon from "@assets/xIcon.svg";

export default function DeleteModal({ handleModal, onDelete }) {
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteClick = async () => {
    setIsLoading(true);
    try {
      await onDelete(password);
      setSubmitStatus("deleteSuccess");
      handleModal(false); 
    } catch (error) {
      if (error.message === "비밀번호가 일치하지 않습니다.") {
        setSubmitStatus("deletePasswordFail");
      } else {
        setSubmitStatus("deleteFail");
      }
    } finally {
      setIsLoading(false);
      setOpen(true); 
    }
  };

  const handleXClick = () => {
    handleModal(false);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button onClick={handleXClick} className={styles.closeButton}>
          <img src={XIcon} alt="닫기" />
        </button>
        <span className="typo-24-bold">게시물 삭제</span>
        <div className={styles.modalInput}>
          <span className="typo-16-medium">삭제 권한 인증</span>
          <input
            type="password"
            placeholder="게시물 비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button disabled={isLoading} onClick={handleDeleteClick}>
          {isLoading ? "처리 중..." : "삭제하기"}
        </Button>
      </div>
      {open && <OkModal handleModal={setOpen} variant={submitStatus} />}
    </div>
  );
}
