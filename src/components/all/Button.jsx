import styles from "./Button.module.css";

/**
 * 버튼 컴포넌트
 * @param {'default' | 'small'} [size='default'] - 버튼 크기
 * @param {string} children - 버튼 텍스트
 * @returns {JSX.Element} 버튼 요소
 */
export default function Button({ size = "default", children, onClick, style }) {
  const sizeClass =
    size === "small" ? styles.buttonSmall : styles.buttonDefault;
  const typoClass = size === "small" ? "typo-14-bold" : "typo-16-medium";
  return (
    <button
      className={`${styles.button} ${sizeClass} ${typoClass}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}
