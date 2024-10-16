import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./Post.module.css";
import UploadButton from "../all/Button";
import UploadPermissionModal from "./UploadPermissionModal";
import { uploadImage } from "@utils/api";

export default function Post() {
  const { groupId } = useParams();
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState("");
  const [moment, setMoment] = useState("");
  const [postPassword, setPostPassword] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);
  const [postData, setPostData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleTagInput = (event) => {
    if (event.key === "Enter" && event.target.value.trim()) {
      const newTag = event.target.value.trim();
      const formattedTag = newTag.startsWith("#") ? newTag : `#${newTag}`;
      if (!tags.includes(formattedTag)) {
        setTags([...tags, formattedTag]);
      }
      event.target.value = "";
      event.preventDefault();
    }
  };

  const handleRemoveTag = (removeTag) => {
    setTags(tags.filter((tag) => tag !== removeTag));
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const togglePublic = () => {
    setIsPublic(!isPublic);
  };

  const preparePostData = async () => {
    if (
      !nickname.trim() ||
      !title.trim() ||
      !content.trim() ||
      !postPassword.trim()
    ) {
      setErrorMessage("필수 항목을 모두 입력해 주세요.");
      return false;
    }

    let imageURL = "";
    if (selectedFile) {
      try {
        const imageUploadResponse = await uploadImage(selectedFile);
        imageURL = imageUploadResponse;
      } catch (error) {
        setErrorMessage("이미지 업로드에 실패했습니다.");
        return false;
      }
    }

    const preparedData = {
      nickname: nickname.trim(),
      title: title.trim(),
      content: content.trim(),
      postPassword: postPassword.trim(),
      imageURL,
      tags,
      location,
      moment,
      isPublic,
    };

    setPostData(preparedData);
    return true;
  };

  const createPost = async () => {
    if (!postData) {
      setErrorMessage("게시물 데이터를 준비하지 못했습니다.");
      return;
    }

    try {
      const response = await fetch(`/api/groups/${groupId}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setNickname("");
        setTitle("");
        setContent("");
        setSelectedFile(null);
        setTags([]);
        setLocation("");
        setMoment("");
        setPostPassword("");
        setIsPublic(false);
        setErrorMessage("");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "게시물 등록에 실패했습니다.");
      }
    } catch (error) {
      setErrorMessage("서버와의 연결에 실패했습니다.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isPrepared = await preparePostData();
    if (isPrepared) {
      setIsModalOpen(true);
    }
  };

  const handleModalSuccess = () => {
    createPost();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.modalWrapper}>
        <h2 className={styles.heading}>추억 올리기</h2>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <form className={styles.postModal} onSubmit={handleSubmit}>
          <section className={styles.leftSide}>
            <label className={styles.label}>닉네임</label>
            <input
              className={styles.input}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력해 주세요"
              required
            />

            <label className={styles.label}>제목</label>
            <input
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해 주세요"
              required
            />

            <label className={styles.label}>이미지</label>
            <div className={styles.fileInputWrapper}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className={styles.hiddenFileInput}
                accept="image/*"
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
                <button
                  type="button"
                  className={styles.removeImageButton}
                  onClick={() => setSelectedFile(null)}
                >
                  이미지 제거
                </button>
              </div>
            )}

            <label className={styles.label}>본문</label>
            <textarea
              className={styles.textarea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="본문 내용을 입력해 주세요"
              required
            />
          </section>

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
                  {tag}{" "}
                  <button
                    type="button"
                    className={styles.removeTagButton}
                    onClick={() => handleRemoveTag(tag)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            <label className={styles.label}>장소</label>
            <input
              className={styles.input}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="장소를 입력해 주세요"
            />

            <label className={styles.label}>추억의 순간</label>
            <input
              type="date"
              className={styles.dateInput}
              value={moment}
              onChange={(e) => setMoment(e.target.value)}
              placeholder="YYYY-MM-DD"
            />

            <label className={styles.label}>비밀번호</label>
            <input
              className={styles.input}
              type="password"
              value={postPassword}
              onChange={(e) => setPostPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요"
              required
            />

            <div className={styles.toggleWrapper}>
              <span className={styles.toggleLabel}>공개 여부</span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={togglePublic}
                />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.buttonWrapper}>
              <UploadButton type="submit">추억 업로드</UploadButton>
            </div>
          </section>
        </form>
      </div>

      {isModalOpen && (
        <UploadPermissionModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          groupId={groupId}
          onSuccess={handleModalSuccess}
        />
      )}
    </div>
  );
}
