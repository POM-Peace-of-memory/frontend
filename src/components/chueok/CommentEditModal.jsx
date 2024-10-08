import { useState } from "react";
import styles from "./CommentEditModal.module.css";

const CommentEditModal = ({ comment, closeModal, onSuccess }) => {
  const [nickname, setNickname] = useState(comment.author);
  const [content, setContent] = useState(comment.text);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    const updateData = {
      nickname,
      content,
      password,
    };

    try {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const updatedComment = await response.json();
        onSuccess({
          id: updatedComment.id,
          author: updatedComment.nickname,
          text: updatedComment.content,
          date: new Date(updatedComment.createdAt).toLocaleString(),
        });
        closeModal();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "댓글 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      setErrorMessage("서버와의 연결에 실패했습니다.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalHeading}>댓글 수정</h2>
        <button className={styles.closeButton} onClick={closeModal}>
          ×
        </button>
        <form onSubmit={handleEditSubmit}>
          <label className={styles.label}>닉네임</label>
          <input
            className={styles.input}
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <label className={styles.label}>내용</label>
          <textarea
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <label className={styles.label}>수정 권한 인증</label>
          <input
            className={styles.input}
            type="password"
            placeholder="댓글 비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <button type="submit" className={styles.submitButton}>
            수정하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentEditModal;
