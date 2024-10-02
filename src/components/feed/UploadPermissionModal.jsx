import { useState } from "react";
import styles from "./UploadPermissionModal.module.css";

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
      const response = await fetch(`/api/groups/${groupId}/verify-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        onSuccess(); 
      } else if (response.status === 401) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "비밀번호가 틀렸습니다.");
      } else {
        setErrorMessage("비밀번호 확인 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 확인 실패:", error);
      setErrorMessage("서버와의 연결에 실패했습니다.");
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
