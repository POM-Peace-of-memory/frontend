import { useState } from "react";
import styles from "./UploadPermissionModal.module.css";

export default function DeleteModal({ closeModal, postId }) {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`/api/posts/${postId}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      console.log("게시물 삭제 성공");
      closeModal(); 
    } else {
      const errorData = await response.json();
      console.error("게시물 삭제 실패:", errorData);
      setErrorMessage(errorData.message || "게시물 삭제에 실패했습니다.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalHeading}>추억 삭제</h2>
        <button className={styles.closeButton} onClick={closeModal}>
          ×
        </button>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>삭제 권한 인증</label>
          <input
            className={styles.input}
            type="password"
            placeholder=" 추억 비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <button type="submit" className={styles.submitButton}>
            삭제하기
          </button>
        </form>
      </div>
    </div>
  );
}
