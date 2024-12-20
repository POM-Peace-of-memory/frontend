import { useRef, useState } from "react";
import { createGroups, uploadImage, updateGroups } from "@/utils/api";
import styles from "./GroupSetup.module.css";
import toggleStyles from "@components/feed/Post.module.css";
import Button from "@components/all/Button";
import OkModal from "@components/group/shared/OkModal";

const INITIAL_VALUES = {
  name: "",
  imageUrl: "",
  isPublic: true,
  introduction: "",
};

export default function GroupSetup({
  variant,
  initialValue = INITIAL_VALUES,
  groupId = "",
}) {
  const [values, setValues] = useState({
    name: initialValue.name,
    password: "",
    imageUrl: initialValue.imageUrl,
    isPublic: initialValue.isPublic,
    introduction: initialValue.introduction,
  });
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({ name: false, password: false });
  const [submitStatus, setSubmitStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { id } = e.target;
    let value;

    if (id === "isPublic") value = e.target.checked;
    else value = e.target.value;

    setValues((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (id === "name") {
      setError((prev) => ({ ...prev, name: value === "" }));
    } else if (id === "password") {
      setError((prev) => ({ ...prev, password: value.length < 8 }));
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.name === "" || values.password.length < 8) {
      setError((prev) => ({ ...prev, name: values.name === "" }));
      setError((prev) => ({ ...prev, password: values.password.length < 8 }));
      return;
    }

    setIsLoading(true);
    let updatedValues = { ...values };

    if (image) {
      try {
        const imageUrl = await uploadImage(image);
        updatedValues.imageUrl = imageUrl;
      } catch (error) {
        console.log(error);
      }
    }

    let result;
    if (variant === "create") {
      try {
        result = await createGroups(updatedValues);
        setSubmitStatus("createSuccess");
      } catch (error) {
        console.log(error);
        setSubmitStatus("createFail");
      }
    } else if (variant === "edit") {
      try {
        result = await updateGroups(updatedValues, groupId);
        setSubmitStatus("updateSuccess");
      } catch (error) {
        console.log(error);
        if (error.message === "비밀번호가 일치하지 않습니다.")
          setSubmitStatus("updatePasswordFail");
        else setSubmitStatus("updateFail");
      }
    }
    setIsLoading(false);
    setOpen(true);
  };

  return (
    <div className={styles.groupSetup}>
      <span className="typo-24-bold">
        {variant === "create" ? "그룹 만들기" : "그룹 정보 수정"}
      </span>
      <form
        onSubmit={handleSubmit}
        className={`typo-14-regular ${styles.groupForm}`}
      >
        <div>
          <label htmlFor="name">그룹명</label>
          <input
            id="name"
            type="text"
            value={values.name}
            placeholder="그룹명을 입력해 주세요"
            onChange={handleChange}
            className={
              error.name
                ? `${styles.formInput} ${styles.invalidateInput}`
                : `${styles.formInput}`
            }
          ></input>
          {error.name && (
            <span style={{ color: "var(--red)" }}>그룹명은 필수입니다.</span>
          )}
        </div>
        <div>
          <label htmlFor="image">대표 이미지</label>
          <div className={styles.formFileInput}>
            <div
              className={`${styles.fileInputName} ${image && styles.selected}`}
            >
              {image
                ? image.name
                : values.imageUrl
                ? "기존 그룹 이미지"
                : `파일을 선택해 주세요`}
            </div>
            <button>
              파일 선택
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
              />
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="introduction">그룹 소개</label>
          <textarea
            id="introduction"
            value={values.introduction}
            placeholder="그룹을 소개해 주세요"
            onChange={handleChange}
            className={styles.formInput}
          ></textarea>
        </div>
        <div>
          <label htmlFor="isPublic">그룹 공개 선택</label>
          <div className={styles.formToggle}>
            <span>{values.isPublic ? `공개` : `비공개`}</span>
            <label className={toggleStyles.switch}>
              <input
                id="isPublic"
                type="checkbox"
                checked={values.isPublic}
                onChange={handleChange}
              />
              <span className={toggleStyles.slider}></span>
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="password">
            {variant === "create" ? "비밀번호 생성" : "수정 권한 인증"}
          </label>
          <input
            id="password"
            type="password"
            value={values.password}
            placeholder={
              variant === "create"
                ? "그룹 비밀번호를 생성해 주세요"
                : "그룹 비밀번호를 입력해 주세요"
            }
            onChange={handleChange}
            className={
              error.password
                ? `${styles.formInput} ${styles.invalidateInput}`
                : `${styles.formInput}`
            }
          ></input>
          {error.password && (
            <span style={{ color: "var(--red)" }}>
              비밀번호는 8자리 이상이어야 합니다.
            </span>
          )}
        </div>
        <Button style={{ marginTop: "20px" }} disabled={isLoading}>
          {isLoading
            ? "처리 중..."
            : variant === "create"
            ? "만들기"
            : "수정하기"}
        </Button>
      </form>
      {open && <OkModal handleModal={setOpen} variant={submitStatus} />}
    </div>
  );
}
