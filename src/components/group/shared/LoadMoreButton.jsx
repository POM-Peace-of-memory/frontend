export default function LoadMoreButton({ onClick, disabled, isLoading }) {
  return (
    !disabled && (
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
        disabled={isLoading}
      >
        {isLoading ? `로딩중...` : `더보기`}
      </button>
    )
  );
}
