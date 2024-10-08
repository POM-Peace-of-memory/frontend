import { useState } from "react";
import styles from "./CommentDeleteModal.module.css";

const CommentDeleteModal = ({ closeModal, onDelete, commentId }) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDeleteClick = async () => {
    if (!password.trim()) {
      setErrorMessage("비밀번호를 입력해 주세요.");
      return;
    }

    try {
      await onDelete(commentId, password); 
      closeModal(); 
    } catch (error) {
      setErrorMessage(error.message); 
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={closeModal}>
          &times;
        </button>
        <p className={styles.commentdelete}>댓글 삭제</p>
        <p className={styles.title}>삭제 권한 인증</p>
        <input
          type="password"
          placeholder="댓글 비밀번호를 입력해 주세요"
          value={password}
          onChange={handlePasswordChange}
          className={styles.passwordInput}
        />
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <button className={styles.deleteButton} onClick={handleDeleteClick}>
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default CommentDeleteModal;
