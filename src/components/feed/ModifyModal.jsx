import { useState, useEffect } from "react";
import { getPostDetail, updatePost, uploadImage } from "@utils/api";
import Button from "@components/all/Button";
import styles from "./ModifyModal.module.css";

const ModifyModal = ({ postId, closeModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [confirmMessage, setConfirmMessage] = useState("");

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const data = await getPostDetail(postId);
        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags);
        setLocation(data.location);
        setDate(data.date);
        setPreviewImage(data.imageUrl);
        setIsPublic(data.isPublic);
        setConfirmMessage(data.confirmMessage);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetail();
  }, [postId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewImage(null);
  };

  const togglePublic = () => {
    setIsPublic(!isPublic);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setTags([...tags, e.target.value.trim()]);
      e.target.value = "";
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = previewImage;

      if (selectedImage) {
        const uploadedImageUrl = await uploadImage(selectedImage);
        imageUrl = uploadedImageUrl;
      }

      const updateData = {
        title,
        content,
        tags,
        location,
        date,
        imageUrl,
        isPublic,
        confirmMessage,
      };

      await updatePost(postId, updateData);
      closeModal();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className={styles.modifyModalOverlay}>
      <div className={styles.modifyModalContainer}>
        <button className={styles.closeButton} onClick={closeModal}>
          ×
        </button>
        <h2 className={styles.modalTitle}>추억 수정</h2>
        <div className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label>닉네임</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="닉네임를 입력해 주세요"
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>태그</label>
            <input
              type="text"
              onKeyDown={handleTagKeyDown}
              placeholder="태그 입력 후 Enter"
              className={styles.input}
            />
            <div className={styles.tagsWrapper}>
              {tags.map((tag, index) => (
                <div key={index} className={styles.tagItem}>
                  {tag}
                  <button
                    className={styles.removeTagButton}
                    onClick={() => handleRemoveTag(tag)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>제목</label>
            <input
              type="text"
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>추억의 순간</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>이미지</label>
            <input
              type="file"
              onChange={handleImageChange}
              className={styles.input}
            />
            {previewImage && (
              <div className={styles.imagePreview}>
                <img
                  src={previewImage}
                  alt="미리보기"
                  className={styles.previewImage}
                />
                <button
                  className={styles.removeImageButton}
                  onClick={handleRemoveImage}
                >
                  이미지 삭제
                </button>
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
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
          </div>

          <div className={styles.formGroup}>
            <label>본문</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="본문 내용을 입력해주세요"
              className={styles.textarea}
            />
          </div>

          <div className={styles.formGroup}>
            <label>수정 권한 인증</label>
            <input
              type="text"
              value={confirmMessage}
              onChange={(e) => setConfirmMessage(e.target.value)}
              placeholder="수정 비밀번호를 입력해주세요"
              className={styles.input}
            />
          </div>

          <div className={styles.buttonContainer}>
            <Button onClick={handleSubmit}>
              수정하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyModal;
