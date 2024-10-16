import { useState } from "react";
import styles from "./UploadPermissionModal.module.css";
import { verifyPassword } from "@utils/api"; 

export default function UploadPermissionModal({
  closeModal,
  groupId,
  onSuccess,
}) {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsVerifying(true);
    setErrorMessage("");

    try {
      const response = await verifyPassword(password, groupId, "groups");

      if (response) {
        console.log("비밀번호 인증 성공");
        onSuccess(); 
      }
    } catch (error) {
      console.error("비밀번호 확인 실패:", error.message);
      setErrorMessage(error.message || "비밀번호 확인에 실패했습니다.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalHeading}>추억 올리기 권한 확인</h2>
        <button className={styles.closeButton} onClick={closeModal}>
          ×
        </button>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>그룹 비밀번호 입력</label>
          <input
            className={styles.input}
            type="password"
            placeholder="그룹 비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isVerifying}
          >
            {isVerifying ? "확인 중..." : "확인"}
          </button>
        </form>
      </div>
    </div>
  );
}
