import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PostDetail.module.css";
import ModifyModal from "./ModifyModal";
import DeleteModal from "./DeleteModal";
import CommentModal from "../chueok/CommentModal";
import CommentEditModal from "../chueok/CommentEditModal";
import CommentDeleteModal from "@components/chueok/CommentDeleteModal";
import flowerImg from "@/assets/flower.svg";
import commentCount from "@/assets/comment.svg";
import {
  getPostDetail,
  getComment,
  createComment,
  deleteComment,
  updateComment,
} from "@utils/api";

const PostDetail = () => {
  const { postId } = useParams();

  const [postDetail, setPostDetail] = useState(null);
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

  const fetchPostDetails = async () => {
    try {
      const data = await getPostDetail(postId);
      setPostDetail(data);
    } catch (error) {
      setErrorMessage(error.message);
      console.error(error);
    }
  };

  const fetchComments = async (page = 1) => {
    try {
      const data = await getComment(postId, { page, pageSize: 10 });
      console.log(data);
      setComments(data.data);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      setErrorMessage("댓글을 불러오는데 실패했습니다.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPostDetails();
    fetchComments(currentPage);
  }, [postId, currentPage]);

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
      {postDetail ? (
        <>
          <div className={styles.writer}>
            <span>{postDetail.nickname}</span>
            <span className={styles.line}>
              | {postDetail.isPublic ? "공개" : "비공개"}
            </span>
          </div>
          <div className={styles.actions}>
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
            <h1>{postDetail.title}</h1>
            <span>{postDetail.tags}</span>
          </div>
          <div className={styles.postInfo}>
            <span>
              {postDetail.location} * {postDetail.createdAt}
            </span>
            <span className={styles.line}>| </span>
            <span className={styles.views}>
              <img src={flowerImg} alt="like" /> {postDetail.likeCount}
            </span>
            <span className={styles.commentCount}>
              <img src={commentCount} alt="comment" /> {postDetail.commentCount}
            </span>
          </div>

          <div className={styles.imageSection}>
            {postDetail.imageUrl === "" ? (
              <div className={styles.noneImg}>
                <img src={flowerImg} alt="게시물이미지" />
              </div>
            ) : (
              <img src={postDetail.imageUrl} alt="게시물이미지" />
            )}
          </div>

          <div className={styles.contentSection}>
            <p>{postDetail.content}</p>
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
          </div>

          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <div className={styles.commentList}>
            {comments.map((comment) => (
              <div key={comment.id} className={styles.commentItem}>
                <div className={styles.commentInfo}>
                  <span className={styles.commentAuthor}>
                    {comment.nickname}
                  </span>
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
              onSuccess={handleCommentSuccess}
            />
          )}

          {showModifyModal && (
            <ModifyModal
              post={postDetail}
              closeModal={() => setShowModifyModal(false)}
            />
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
              onDelete={(password) =>
                handleDeleteComment(deletingCommentId, password)
              }
            />
          )}
        </>
      ) : (
        <p>게시글을 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default PostDetail;
