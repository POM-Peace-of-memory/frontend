import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PostDetail.module.css";
import ModifyModal from "./ModifyModal";
import DeleteModal from "./DeleteModal";
import CommentModal from "../chueok/CommentModal";
import CommentEditModal from "../chueok/CommentEditModal";

const PostDetail = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "다람이네가족",
      date: "24.01.18 21:50",
      text: "우와 60cm이라니..!! 저도 가족들과 가봐야겠어요~",
    },
    {
      id: 2,
      author: "핑구",
      date: "24.01.18 21:50",
      text: "우와 60cm이라니..!! 저도 가족들과 가봐야겠어요~",
    },
    {
      id: 3,
      author: "달팽스",
      date: "24.01.18 21:50",
      text: "우와 60cm이라니..!! 저도 가족들과 가봐야겠어요~",
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState({});

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentButtonClick = (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      setShowCommentModal(true);
    } else {
      setErrorMessage("댓글 내용을 입력해 주세요.");
    }
  };

  const handleCommentSuccess = (newCommentData) => {
    const formattedDate = new Date(newCommentData.createdAt).toLocaleString();
    const commentObj = {
      id: comments.length + 1,
      author: newCommentData.nickname,
      date: formattedDate,
      text: newCommentData.content,
    };
    setComments([...comments, commentObj]);
    setNewComment("");
    setErrorMessage("");
  };

  const handleEditCommentClick = (comment) => {
    setEditingCommentId(comment.id);
    setCommentToEdit(comment);
    setShowEditModal(true);
  };

  const handleEditCommentSuccess = (updatedComment) => {
    setComments(
      comments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
    setShowEditModal(false);
  };

  return (
    <div className={styles.postDetailContainer}>
      <div className={styles.writer}>
        <span>달봉이아들</span>
        <span className={styles.line}>|</span>
        <span className={styles.postPrivacy}>공개</span>
        <button
          className={styles.edit}
          onClick={() => setShowModifyModal(true)}
        >
          추억 수정하기
        </button>
        <button
          className={styles.delete}
          onClick={() => setShowDeleteModal(true)}
        >
          추억 삭제하기
        </button>
      </div>
      <div className={styles.titleSection}>
        <h1>인천 앞바다에서 무려 60cm 월척을 낚다!</h1>
        <div>
          <span className={styles.category}>#인천 #낚시</span>
        </div>
        <div className={styles.contentTitle}>
          <span>인천 앞바다 · 24.01.19</span>
          <span className={styles.viewsComments}>
            <img src="src/assets/flower.svg" alt="조회수" />
            <span>120</span>
            <img src="src/assets/comment.svg" alt="댓글" />
            <span>8</span>
          </span>
        </div>
      </div>
      <div className={styles.imageSection}>
        <img src="src/assets/Image 4.svg" alt="인천 앞바다 게시물 이미지" />
      </div>

      <div className={styles.contentSection}>
        <p>
          인천 앞바다에서 월척을 낚았습니다! 가족들과 기억에 오래도록 남을 멋진
          하루였어요 가족들과 기억에 오래도록 남을 멋진 하루였어요 가족들과
          기억에 오래도록 남을 멋진 하루였어요 인천 앞바다에서 월척을
          낚았습니다! 가족들과 기억에 오래도록 남을 멋진 하루였어요 인천
          앞바다에서 월척을 낚았습니다!
        </p>
      </div>
      <button
        type="submit"
        className={styles.commentButton}
        onClick={handleCommentButtonClick}
      >
        댓글 등록하기
      </button>

      <div className={styles.commentSection}>
        <h3>댓글 {comments.length}</h3>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={styles.commentForm}
        >
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력해 주세요"
            className={styles.commentInput}
          />
        </form>
      </div>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.commentItem}>
            <div className={styles.commentInfo}>
              <span className={styles.commentAuthor}>{comment.author}</span>
              <span className={styles.commentDate}>{comment.date}</span>
            </div>
            <div className={styles.commentContent}>
              <p className={styles.commentText}>{comment.text}</p>
              <div className={styles.commentActions}>
                <button
                  className={styles.editButton}
                  onClick={() => handleEditCommentClick(comment)}
                >
                  <img src="src/assets/edit.svg" alt="수정" />
                </button>
                <button className={styles.deleteButton}>
                  <img src="src/assets/delete.svg" alt="삭제" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button>&laquo;</button>
        <button className={styles.active}>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>&raquo;</button>
      </div>

      {showModifyModal && (
        <ModifyModal closeModal={() => setShowModifyModal(false)} />
      )}
      {showDeleteModal && (
        <DeleteModal closeModal={() => setShowDeleteModal(false)} />
      )}
      {showCommentModal && (
        <CommentModal
          closeModal={() => setShowCommentModal(false)}
          postId={postId}
          content={newComment}
          onSuccess={handleCommentSuccess}
        />
      )}

      {showEditModal && (
        <CommentEditModal
          comment={commentToEdit}
          closeModal={() => setShowEditModal(false)}
          onSuccess={handleEditCommentSuccess}
        />
      )}
    </div>
  );
};

export default PostDetail;
