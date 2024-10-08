import { useState } from "react";
import styles from "./CommentModal.module.css";

export default function CommentModal({
  closeModal,
  postId,
  content,
  onSuccess,
}) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    if (!nickname.trim() || !password.trim()) {
      setErrorMessage("닉네임과 비밀번호를 모두 입력해 주세요.");
      setIsSubmitting(false);
      return;
    }

    const commentData = {
      nickname: nickname.trim(),
      content: content.trim(),
      password: password.trim(),
    };

    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("댓글 등록 성공:", data);
        onSuccess(data);
        closeModal();
      } else if (response.status === 400) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "댓글 등록에 실패했습니다.");
      } else {
        setErrorMessage("댓글 등록 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("API 요청 실패:", error);
      setErrorMessage("서버와의 연결에 실패했습니다.");
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
            value={content}
            readOnly
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
