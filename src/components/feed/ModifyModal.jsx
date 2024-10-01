import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ModifyModal.module.css";
import ModifyButton from "../all/Button";

export default function ModifyModal({ closeModal }) {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState("");
  const [moment, setMoment] = useState("");
  const [postPassword, setPostPassword] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        const data = await response.json();
        setNickname(data.nickname);
        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags);
        setLocation(data.location);
        setMoment(data.moment);
        setIsPublic(data.isPublic);
      } catch (error) {
        console.error("게시물 데이터를 불러오는 중 오류 발생:", error);
        setErrorMessage("게시물 데이터를 불러오지 못했습니다.");
      }
    };
    fetchPostData();
  }, [postId]);

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

  const updatePost = async () => {
    let imageURL = "";
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const imageUploadResponse = await fetch("/api/uploadImage", {
          method: "POST",
          body: formData,
        });

        if (imageUploadResponse.ok) {
          const imageData = await imageUploadResponse.json();
          imageURL = imageData.url;
        } else {
          setErrorMessage("이미지 업로드에 실패했습니다.");
          return;
        }
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        setErrorMessage("이미지 업로드 중 오류가 발생했습니다.");
        return;
      }
    }

    const updateData = {
      nickname,
      title,
      content,
      postPassword,
      imageURL,
      tags,
      location,
      moment,
      isPublic,
    };

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        console.log("게시물 수정 성공");
        navigate("/feed");
      } else {
        const errorData = await response.json();
        console.error("게시물 수정 실패:", errorData);
        setErrorMessage(errorData.message || "게시물 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("API 요청 실패:", error);
      setErrorMessage("서버와의 연결에 실패했습니다.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updatePost();
    closeModal(); 
  };

  return (
    <div className={styles.modifyContainer}>
      <div className={styles.modalWrapper}>
        <h2 className={styles.heading}>추억 수정하기</h2>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <form className={styles.modifyForm} onSubmit={handleSubmit}>
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
              placeholder="#태그 입력"
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
              className={styles.dateInput}
              type="date"
              value={moment}
              onChange={(e) => setMoment(e.target.value)}
            />

            <label className={styles.label}>비밀번호</label>
            <input
              className={styles.input}
              value={postPassword}
              onChange={(e) => setPostPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요"
              required
            />

            <div className={styles.publicToggle}>
              <input
                type="checkbox"
                checked={isPublic}
                onChange={togglePublic}
              />
              <span>{isPublic ? "공개" : "비공개"}</span>
            </div>
          </section>

          <div className={styles.buttonContainer}>
            <ModifyButton type="submit" text="수정하기" />
          </div>
        </form>
      </div>
    </div>
  );
}
