import { useState } from "react";
import styles from "./PrivatePost.module.css";

export default function PrivatePost() {
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //비밀번호 검증 로직 추가 예정
    console.log("입력된 비밀번호:", password);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>비공개 추억</h2>
      <p className={styles.mention}>
        비공개 추억에 접근하기 위해 권한 확인이 필요합니다.
      </p>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>비밀번호 입력</label>
        <input
          className={styles.input}
          type="password"
          placeholder=" 추억 비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.submitButton}>
          제출하기
        </button>
      </form>
    </div>
  );
}
