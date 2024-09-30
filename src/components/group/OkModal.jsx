import { useNavigate } from "react-router-dom";
import styles from "./OkModal.module.css";
import Button from "../all/Button";

export default function OkModal({ handleModal, varient }) {
  const navigate = useNavigate();

  const handleOnClick = () => {
    handleModal(false);
    navigate("/");
  };

  const modalInfo = {
    createSuccess: {
      mainText: "그룹 만들기 성공",
      subText: "그룹이 성공적으로 등록되었습니다.",
    },
    createFail: {
      mainText: "그룹 만들기 실패",
      subText: "그룹 등록에 실패했습니다.",
    },
    accessDenied: {
      mainText: "비공개 그룹 접근 실패",
      subText: "비밀번호가 일치하지 않습니다.",
    },
  };
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalInfo}>
          <span className="typo-24-bold">{modalInfo[varient].mainText}</span>
          <span className="typo-14-regular">{modalInfo[varient].subText}</span>
        </div>
        <Button onClick={handleOnClick}>확인</Button>
      </div>
    </div>
  );
}
