import { useState } from "react";
import styles from "./GroupSetup.module.css";
import toggleStyles from "@components/feed/Post.module.css";
import Button from "../all/Button";

export default function GroupSetup() {
  const [isPublic, setIsPublic] = useState(true);
  return (
    <div className={styles.groupSetup}>
      <span className="typo-24-bold">그룹 만들기</span>
      <form className={`typo-16-medium ${styles.groupForm}`}>
        <div>
          <label htmlFor="name">그룹명</label>
          <input
            id="name"
            type="text"
            placeholder="그룹명을 입력해 주세요"
            className={styles.formInput}
          ></input>
        </div>
        <div>
          <label htmlFor="imageUrl">대표 이미지</label>
          <input id="imageUrl" type="file" className={styles.formInput} />
        </div>
        <div>
          <label htmlFor="introduction">그룹 소개</label>
          <textarea
            id="introduction"
            placeholder="그룹을 소개해 주세요"
            className={styles.formInput}
          ></textarea>
        </div>
        <div>
          <label htmlFor="isPublic">그룹 공개 선택</label>
          <div className={styles.formToggle}>
            <span>공개</span>
            <label className={toggleStyles.switch}>
              <input id="isPublic" type="checkbox" value={isPublic} />
              <span className={toggleStyles.slider}></span>
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="password">비밀번호 생성</label>
          <input
            id="password"
            type="password"
            placeholder="그룹 비밀번호를 생성해 주세요"
            className={styles.formInput}
          ></input>
        </div>

        <Button style={{ marginTop: "20px" }}>만들기</Button>
      </form>
    </div>
  );
}
