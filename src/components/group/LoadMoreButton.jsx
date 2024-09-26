export default function LoadMoreButton() {
  const handleLoadMore = () => {};

  return (
    <button
      style={{
        display: "flex",
        width: "100%",
        height: "60px",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        borderRadius: "6px",
        border: "1px solid var(--black)",
        backgroundColor: "var(--gray-50)",
        cursor: "pointer",
      }}
      className="typo-14-bold"
      onClick={handleLoadMore}
    >
      더보기
    </button>
  );
}
