export default function LoadMoreButton({ onClick, disabled }) {
  return (
    !disabled && (
      <div
        style={{
          display: "flex",
          width: "100%",
          minWidth: "965px",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          backgroundColor: "var(--gray-50)",
          padding: "0 10%",
          marginBottom: "40px",
        }}
      >
        <button
          style={{
            width: "100%",
            height: "60px",
            borderRadius: "6px",
            border: "1px solid var(--black)",
            backgroundColor: "var(--gray-50)",
            cursor: "pointer",
          }}
          className="typo-14-bold"
          onClick={onClick}
        >
          더보기
        </button>
      </div>
    )
  );
}
