import { useRef, useState, useEffect } from "react";
import rightArrow from "@assets/rightArrow.svg";
import leftArrow from "@assets/leftArrow.svg";
import styles from "./Badge.module.css";

const renderBadges = {
  badge1: "👾\u00A0\u00A0 7일 연속 추억 등록",
  badge2: "🎞️\u00A0\u00A0 추억 수 20개 이상 등록",
  badge3: "🎉\u00A0\u00A0 그룹 생성 후 1년 달성",
  badge4: "🌼\u00A0\u00A0 그룹 공감 1만 개 이상 받기",
  badge5: "💖\u00A0\u00A0 게시글 공감 1만 개 이상 받기",
};

export default function Badge({ badges }) {
  const badgeListRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const checkScroll = () => {
    if (badgeListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = badgeListRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (badgeListRef.current) {
      const scrollAmount =
        direction === "left"
          ? -(badgeListRef.current.clientWidth - 100)
          : badgeListRef.current.clientWidth - 100;
      badgeListRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.badgeContainer}>
      <span className="typo-16-bold">획득 배지</span>
      <div className={styles.badgeListWrapper}>
        {showLeftButton && (
          <div className={`${styles.scrollButton} ${styles.leftScrollButton}`}>
            <button onClick={() => scroll("left")}>
              <img src={leftArrow} alt="왼쪽 화살표" />
            </button>
          </div>
        )}
        <div
          ref={badgeListRef}
          className={`typo-16-medium ${styles.badgeList}`}
          onScroll={checkScroll}
        >
          {badges.map((badge, index) => (
            <div key={index} className={styles.badge}>
              {renderBadges[badge]}
            </div>
          ))}
          {badges.length === 0 && (
            <div className={styles.nonBadge}>아직 획득한 배지가 없습니다.</div>
          )}
        </div>
        {showRightButton && (
          <div className={`${styles.scrollButton} ${styles.rightScrollButton}`}>
            <button onClick={() => scroll("right")}>
              <img src={rightArrow} alt="오른쪽 화살표" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
