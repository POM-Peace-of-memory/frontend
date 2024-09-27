import { useState, useRef } from "react";
import styles from "./Post.module.css";
import UploadButton from "../all/Button";
import UploadPermissionModal from "./UploadPermissionModal";

export default function Post() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [isPublic, setIsPublic] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleTagInput = (event) => {
    if (event.key === "Enter" && event.target.value.trim()) {
      setTags([...tags, event.target.value]);
      event.target.value = "";
      event.preventDefault(); //Enter 키 입력 후 폼 제출 방지
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const togglePublic = () => {
    setIsPublic(!isPublic);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with: ", { selectedFile, tags, isPublic });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.modalWrapper}>
        <h2 className={styles.heading}>추억 올리기</h2>
        <form className={styles.postModal} onSubmit={handleSubmit}>
          {/* Left Side */}
          <section className={styles.leftSide}>
            <label className={styles.label}>닉네임</label>
            <input
              className={styles.input}
              placeholder="닉네임을 입력해 주세요"
            />

            <label className={styles.label}>제목</label>
            <input
              className={styles.input}
              placeholder="제목을 입력해 주세요"
            />

            <label className={styles.label}>이미지</label>
            <div className={styles.fileInputWrapper}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className={styles.hiddenFileInput}
              />
              <input
                className={styles.input}
                value={
                  selectedFile ? selectedFile.name : "파일을 선택해 주세요"
                }
                readOnly
              />
              <button
                type="button"
                className={styles.fileButton}
                onClick={handleFileButtonClick}
              >
                파일 선택
              </button>
            </div>

            {selectedFile && (
              <div className={styles.imagePreview}>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="선택된 이미지 미리보기"
                  className={styles.previewImage}
                />
              </div>
            )}

            <label className={styles.label}>본문</label>
            <textarea
              className={styles.textarea}
              placeholder="본문 내용을 입력해 주세요"
            />
          </section>

          {/* Right Side */}
          <section className={styles.rightSide}>
            <label className={styles.label}>태그</label>
            <input
              className={styles.input}
              placeholder="#태그 선택"
              onKeyUp={handleTagInput}
            />
            <div className={styles.tagsWrapper}>
              {tags.map((tag, index) => (
                <span key={index} className={styles.tagItem}>
                  #{tag}
                </span>
              ))}
            </div>

            <label className={styles.label}>장소</label>
            <input
              className={styles.input}
              placeholder="장소를 입력해 주세요"
            />

            <label className={styles.label}>추억의 순간</label>
            <input className={styles.dateInput} type="date" />

            <label className={styles.label}>추억 공개 선택</label>
            <div className={styles.toggleWrapper}>
              <span className={styles.toggleLabel}>공개</span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={togglePublic}
                />
                <span className={styles.slider}></span>
              </label>
            </div>

            <label className={styles.label}>비밀번호 생성</label>
            <input
              className={styles.input}
              placeholder="추억 비밀번호를 생성해 주세요"
            />
          </section>
        </form>
        <UploadButton onClick={() => setIsModalOpen(true)}>올리기</UploadButton>
      </div>

      {isModalOpen && <UploadPermissionModal closeModal={closeModal} />}
    </div>
  );
}
