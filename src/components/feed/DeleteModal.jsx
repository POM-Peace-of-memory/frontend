import { useState } from "react";
import styles from "./UploadPermissionModal.module.css";

export default function DeleteModal({ closeModal }) {
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //비밀번호 검증 로직 추가 예정
    console.log("입력된 비밀번호:", password);
    closeModal();
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
          <button type="submit" className={styles.submitButton}>
            삭제하기
          </button>
        </form>
      </div>
    </div>
  );
}
