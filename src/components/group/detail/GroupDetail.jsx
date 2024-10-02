import { calculateDDay, formatNumber } from "@/utils/utils";
import { useNavigate } from "react-router-dom";
import styles from "./GroupDetail.module.css";
import Badge from "@components/badges/Badge";
import Button from "@components/all/Button";
import flower from "@assets/flower.svg";

const INITIAL_VALUE = {
  id: 123,
  name: "가족달봉이네 가족달봉이네 가족달봉이네 가족",
  imageUrl:
    "https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004",
  isPublic: true,
  likeCount: 1500,
  badges: ["badge1", "badge2"],
  postCount: 0,
  createdAt: "2024-02-22T07:47:49.803Z",
  introduction:
    "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다. 서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다. 그냥 끝까지로 할게요 그리고 두 줄까지만!",
};

export default function GroupDetail() {
  const navigate = useNavigate();
  const handleButton = () => {
    navigate("/feed");
  };

  return (
    <>
      <div className={styles.groupDetail}>
        <div className={styles.groupImg}>
          <img src={INITIAL_VALUE.imageUrl} alt="그룹이미지" />
        </div>
        <div className={styles.groupInfo}>
          <div className={styles.infoContainer}>
            <div className={`typo-16-regular ${styles.groupDatePublic}`}>
              <span>{calculateDDay(INITIAL_VALUE.createdAt)}</span>
              <span>|</span>
              <span>{INITIAL_VALUE.isPublic ? "공개" : "비공개"}</span>
            </div>
            <div className={`typo-14-regular ${styles.groupUpdateDelete}`}>
              <button>그룹 정보 수정하기</button>
              <button>그룹 삭제하기</button>
            </div>
          </div>
          <div className={styles.infoContainer}>
            <div className={`typo-30-bold ${styles.groupTitle}`}>
              {INITIAL_VALUE.name}
            </div>
            <div className={`typo-18-bold ${styles.groupPostLike}`}>
              <span>추억 {INITIAL_VALUE.postCount}</span>
              <span>|</span>
              <span>그룹 공감 {formatNumber(INITIAL_VALUE.likeCount)}</span>
            </div>
          </div>
          <div className={`typo-18-regular ${styles.infoContainer}`}>
            {INITIAL_VALUE.introduction}
          </div>
          <div className={styles.bagesLikeButton}>
            <Badge />
            <button className={styles.likeButton}>
              <img src={flower} alt="공감" />
              <span className="typo-16-medium">공감 보내기</span>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.memoryHeader}>
        <div></div>
        <span className="typo-24-bold">추억 목록</span>
        <Button size="small" onClick={handleButton}>
          추억 올리기
        </Button>
      </div>
    </>
  );
}
