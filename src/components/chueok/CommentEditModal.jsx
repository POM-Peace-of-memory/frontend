import { useState } from "react";
import styles from "./CommentEditModal.module.css";

const CommentEditModal = ({
  closeModal,
  onEditSuccess,
  content,
  nickname,
}) => {
  const [editContent, setEditContent] = useState(content || "");
  const [inputPassword, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleContentChange = (event) => {
    setEditContent(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setInputPassword(event.target.value);
  };

  const handleEditClick = async () => {
    setErrorMessage("");

    if (!editContent.trim()) {
      setErrorMessage("수정할 내용을 입력해 주세요.");
      return;
    }
    if (!inputPassword.trim()) {
      setErrorMessage("비밀번호를 입력해 주세요.");
      return;
    }

    try {
      await onEditSuccess(editContent, inputPassword);
      closeModal();
    } catch (error) {
      setErrorMessage(error.message || "댓글 수정에 실패했습니다.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={closeModal}>
          &times;
        </button>
        <h2 className={styles.modalTitle}>댓글 수정</h2>

        <label className={styles.label}>닉네임</label>
        <input type="text" value={nickname} className={styles.input} disabled />

        <label className={styles.label}>댓글</label>
        <textarea
          placeholder="수정할 내용을 입력해 주세요"
          value={editContent}
          onChange={handleContentChange}
          className={styles.textarea}
        />

        <label className={styles.label}>수정 권한 인증</label>
        <input
          type="password"
          placeholder="댓글 비밀번호를 입력해 주세요"
          value={inputPassword}  
          onChange={handlePasswordChange}
          className={styles.input}
        />

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <button className={styles.submitButton} onClick={handleEditClick}>
          수정하기
        </button>
      </div>
    </div>
  );
};

export default CommentEditModal;
