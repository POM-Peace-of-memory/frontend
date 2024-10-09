import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyPassword } from "@/utils/api";
import styles from "./Private.module.css";
import OkModal from "@components/group/shared/OkModal";
import Button from "@components/all/Button";

export default function Private({ id, variant }) {
  const [password, setPassword] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const renderText = { groups: "그룹", posts: "추억" };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    setIsVerifying(true);

    let result;
    try {
      result = await verifyPassword(password, id, variant);
      navigate(`/${variant}/${id}`);
    } catch (error) {
      console.log(error);
      if (error.message === "비밀번호가 일치하지 않습니다.")
        setSubmitStatus("accessDenied");
      else setSubmitStatus("networkError");
      setOpen(true);
    } finally {
      setIsVerifying(false);
      console.log(result);
    }
  };

  return (
    <div className={styles.container}>
      <span className="typo-24-bold">{`비공개 ${renderText[variant]}`}</span>
      <span className="typo-14-regular">
        {`비공개 ${renderText[variant]}에 접근하기 위해 권한 확인이 필요합니다.`}
      </span>
      <form className={styles.form}>
        <label className="typo-16-medium">비밀번호 입력</label>
        <input
          className={`typo-14-regular ${styles.input}`}
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder={`${renderText[variant]} 비밀번호를 입력해 주세요`}
          required
        />
        <Button onClick={handleSubmitClick} disabled={isVerifying}>
          {isVerifying ? "처리 중..." : "제출하기"}
        </Button>
      </form>
      {open && <OkModal handleModal={setOpen} variant={submitStatus} />}
    </div>
  );
}
