import { useRef, useState } from "react";
import { createGroups, uploadImage } from "@/utils/api";
import styles from "./GroupSetup.module.css";
import toggleStyles from "@components/feed/Post.module.css";
import Button from "@components/all/Button";
import OkModal from "./OkModal";

const INITIAL_VALUES = {
  name: "",
  password: "",
  image: null,
  isPublic: true,
  introduction: "",
};

export default function GroupSetup() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [open, setOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { id } = e.target;
    let value;

    if (id === "isPublic") value = e.target.checked;
    else if (id === "image") value = e.target.files[0];
    else value = e.target.value;

    setValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const imgUrl = await uploadImage(values.image);
    const imgUrl = values.image;
    let result;
    try {
      result = await createGroups({
        name: values.name,
        password: values.password,
        imgUrl,
        isPublic: values.isPublic,
        introduction: values.introduction,
      });
      setSubmitStatus("createSuccess");
    } catch (error) {
      console.log(error);
      setSubmitStatus("createFail");
    }
    console.log(values);
    setOpen(true);
  };

  return (
    <div className={styles.groupSetup}>
      <span className="typo-24-bold">그룹 만들기</span>
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
            className={styles.formInput}
          ></input>
        </div>
        <div>
          <label htmlFor="image">대표 이미지</label>
          <div className={styles.formFileInput}>
            <div
              className={`${styles.fileInputName} ${
                values.image && styles.selected
              }`}
            >
              {values.image ? values.image.name : `파일을 선택해 주세요`}
            </div>
            <button>
              파일 선택
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
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
          <label htmlFor="password">비밀번호 생성</label>
          <input
            id="password"
            type="password"
            value={values.password}
            placeholder="그룹 비밀번호를 생성해 주세요"
            onChange={handleChange}
            className={styles.formInput}
          ></input>
        </div>
        <Button style={{ marginTop: "20px" }}>만들기</Button>
      </form>
      {open && <OkModal handleModal={setOpen} varient={submitStatus} />}
    </div>
  );
}
