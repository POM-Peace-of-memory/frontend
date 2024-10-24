import { useState } from "react";
import styles from "./CommentModal.module.css";
import { createComment } from "@utils/api";

export default function CommentModal({
  closeModal,
  postId,
  initialContent = "",
  onSuccess,
}) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    if (!nickname.trim() || !password.trim() || !content.trim()) {
      setErrorMessage("닉네임, 비밀번호, 그리고 댓글을 모두 입력해 주세요.");
      setIsSubmitting(false);
      return;
    }

    const commentData = {
      nickname: nickname.trim(),
      content: content.trim(),
      password: password.trim(),
    };

    try {
      const data = await createComment(postId, commentData);

      console.log("댓글 등록 성공:", data);
      onSuccess(data);
      closeModal();
    } catch (error) {
      console.error("API 요청 실패:", error);
      setErrorMessage(error.message || "댓글 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalHeading}>댓글 등록</h2>
        <button className={styles.closeButton} onClick={closeModal}>
          ×
        </button>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>닉네임</label>
          <input
            className={styles.input}
            type="text"
            placeholder="닉네임을 입력해 주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <label className={styles.label}>댓글</label>
          <textarea
            className={styles.textarea}
            placeholder="댓글을 입력해 주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <label className={styles.label}>비밀번호 설정</label>
          <input
            className={styles.input}
            type="password"
            placeholder="댓글 비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "등록 중..." : "등록하기"}
          </button>
        </form>
      </div>
    </div>
  );
}
