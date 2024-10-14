import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PostDetail.module.css";
import ModifyModal from "./ModifyModal";
import DeleteModal from "./DeleteModal";
import CommentModal from "../chueok/CommentModal";
import CommentEditModal from "../chueok/CommentEditModal";
import CommentDeleteModal from "@components/chueok/CommentDeleteModal";
import { createComment, deleteComment, updateComment } from "@utils/api";

const PostDetail = () => {
  const { postId } = useParams();
  console.log(postId);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newComment, setNewComment] = useState("");
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState({});
  const [showCommentDeleteModal, setShowCommentDeleteModal] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  const fetchComments = async (page = 1) => {
    try {
      const response = await fetch(
        `/api/posts/${postId}/comments?page=${page}&pageSize=10`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments.");
      }
      const data = await response.json();
      setComments(data.data);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
      setErrorMessage("댓글을 불러오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchComments(currentPage);
  }, [currentPage]);

  const handleCommentButtonClick = async (event) => {
    event.preventDefault();
    setShowCommentModal(true);
    if (newComment.trim()) {
      try {
        const newCommentData = {
          content: newComment,
          nickname: "UserNickname",
          password: "UserPassword",
        };
        const createdComment = await createComment(postId, newCommentData);
        handleCommentSuccess(createdComment);
      } catch (error) {
        setErrorMessage("댓글 등록에 실패했습니다.");
        console.error(error);
      }
    } else {
      setErrorMessage("댓글 내용을 입력해 주세요.");
    }
  };

  const handleCommentSuccess = (newCommentData) => {
    const formattedDate = new Date(newCommentData.createdAt).toLocaleString();
    const commentObj = {
      id: newCommentData.id,
      nickname: newCommentData.nickname,
      createdAt: formattedDate,
      content: newCommentData.content,
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

  const handleEditCommentSuccess = async (updatedCommentContent, password) => {
    try {
      const updatedCommentData = { content: updatedCommentContent, password };
      const updatedComment = await updateComment(
        editingCommentId,
        updatedCommentData
      );
      setComments(
        comments.map((comment) =>
          comment.id === updatedComment.id ? updatedComment : comment
        )
      );
      setShowEditModal(false);
    } catch (error) {
      setErrorMessage("댓글 수정에 실패했습니다.");
      console.error(error);
    }
  };

  const handleDeleteCommentClick = (commentId) => {
    setDeletingCommentId(commentId);
    setShowCommentDeleteModal(true);
  };

  const handleDeleteComment = async (commentId, password) => {
    try {
      await deleteComment(commentId, password);
      setComments(comments.filter((comment) => comment.id !== commentId));
      setShowCommentDeleteModal(false);
    } catch (error) {
      setErrorMessage("댓글 삭제에 실패했습니다.");
      console.error(error);
    }
  };

  const handlePaginationClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
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
            onChange={(e) => setNewComment(e.target.value)}
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
              <span className={styles.commentAuthor}>{comment.nickname}</span>
              <span className={styles.commentDate}>
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
            <div className={styles.commentContent}>
              <p className={styles.commentText}>{comment.content}</p>
              <div className={styles.commentActions}>
                <button
                  className={styles.editButton}
                  onClick={() => handleEditCommentClick(comment)}
                >
                  <img src="src/assets/edit.svg" alt="수정" />
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteCommentClick(comment.id)}
                >
                  <img src="src/assets/delete.svg" alt="삭제" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationClick(currentPage - 1)}
        >
          &laquo;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? styles.active : ""}
            onClick={() => handlePaginationClick(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePaginationClick(currentPage + 1)}
        >
          &raquo;
        </button>
      </div>

      {showCommentModal && (
        <CommentModal
          closeModal={() => setShowCommentModal(false)}
          onCommentSuccess={handleCommentSuccess} 
        />
      )}
      {showModifyModal && (
        <ModifyModal closeModal={() => setShowModifyModal(false)} />
      )}
      {showDeleteModal && (
        <DeleteModal closeModal={() => setShowDeleteModal(false)} />
      )}

      {showEditModal && (
        <CommentEditModal
          comment={commentToEdit}
          closeModal={() => setShowEditModal(false)}
          onSuccess={handleEditCommentSuccess}
        />
      )}

      {showCommentDeleteModal && (
        <CommentDeleteModal
          closeModal={() => setShowCommentDeleteModal(false)}
          commentId={deletingCommentId}
          onDelete={handleDeleteComment}
        />
      )}
    </div>
  );
};

export default PostDetail;
