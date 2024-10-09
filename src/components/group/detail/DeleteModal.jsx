import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteGroups } from "@/utils/api";
import styles from "./DeleteModal.module.css";
import Button from "@components/all/Button";
import OkModal from "@components/group/shared/OkModal";
import XIcon from "@assets/xIcon.svg";

export default function DeleteModal({ handleModal, groupId }) {
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleDelteClick = async () => {
    let result;
    try {
      result = await deleteGroups(password, groupId);
      setSubmitStatus("deleteSuccess");
    } catch (error) {
      console.log(error);
      setSubmitStatus("deleteFail");
    }
    console.log(result);
    setOpen(true);
  };

  const handleXClick = () => {
    handleModal(false);
  };
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button onClick={handleXClick} className={styles.closeButton}>
          <img src={XIcon} alt="닫기" />
        </button>
        <span className="typo-24-bold">그룹 삭제</span>
        <div className={styles.modalInput}>
          <span className="typo-16-medium">삭제 권한 인증</span>
          <input
            type="password"
            placeholder="그룹 비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <Button onClick={handleDelteClick}>삭제하기</Button>
      </div>
      {open && <OkModal handleModal={setOpen} variant={submitStatus} />}
    </div>
  );
}
