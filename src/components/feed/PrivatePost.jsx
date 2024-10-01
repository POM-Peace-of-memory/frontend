import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PrivatePost.module.css";

export default function PrivatePost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsVerifying(true);
    setErrorMessage("");

    try {
      const response = await fetch(`/api/posts/${postId}/verify-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postPassword: password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        //비밀번호 검증이 성공하면 /privatePost/{postId} 페이지로 이동함. 추후 privatePost 페이지 구현 예정
        navigate(`/privatePost/${postId}`);
      } else if (response.status === 401) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "비밀번호가 일치하지 않습니다.");
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
    <div className={styles.container}>
      <h2 className={styles.title}>비공개 추억</h2>
      <p className={styles.mention}>
        비공개 추억에 접근하기 위해 권한 확인이 필요합니다.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>비밀번호 입력</label>
        <input
          className={styles.input}
          type="password"
          placeholder="추억 비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}{" "}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isVerifying}
        >
          {isVerifying ? "확인 중..." : "제출하기"}
        </button>
      </form>
    </div>
  );
}
