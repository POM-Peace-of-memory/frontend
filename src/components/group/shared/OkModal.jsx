import { useNavigate } from "react-router-dom";
import styles from "./OkModal.module.css";
import Button from "@components/all/Button";

export default function OkModal({ handleModal, variant }) {
  const navigate = useNavigate();
  console.log(variant);

  const handleOnClick = () => {
    handleModal(false);

    if (["createSuccess", "createFail", "deleteSuccess"].includes(variant))
      navigate("/");
    if (variant === "updateSuccess") navigate(0);
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
    updateSuccess: {
      mainText: "그룹 수정 성공",
      subText: "그룹이 성공적으로 수정되었습니다.",
    },
    updateFail: {
      mainText: "그룹 수정 실패",
      subText: "그룹 수정에 실패했습니다.",
    },
    updatePasswordFail: {
      mainText: "그룹 수정 실패",
      subText: "비밀번호가 일치하지 않습니다.",
    },
    deleteSuccess: {
      mainText: "그룹 삭제 성공",
      subText: "그룹이 성공적으로 삭제되었습니다.",
    },
    deleteFail: {
      mainText: "그룹 삭제 실패",
      subText: "그룹 삭제에 실패했습니다.",
    },
    accessDenied: {
      mainText: "비공개 페이지 접근 실패",
      subText: "비밀번호가 일치하지 않습니다.",
    },
    networkError: {
      mainText: "서버 연결 장애 발생",
      subText: "서버와의 연결에 실패했습니다.",
    },
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalInfo}>
          <span className="typo-24-bold">{modalInfo[variant].mainText}</span>
          <span className="typo-14-regular">{modalInfo[variant].subText}</span>
        </div>
        <Button onClick={handleOnClick}>확인</Button>
      </div>
    </div>
  );
}
