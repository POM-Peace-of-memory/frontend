import "./Button.css";

/**
 * 버튼 컴포넌트
 * @param {'default' | 'small'} [size='default'] - 버튼 크기
 * @param {string} children - 버튼 텍스트
 * @returns {JSX.Element} 버튼 요소
 */

export default function Button({ size = "default", children }) {
  const sizeClass =
    size === "small"
      ? "button-small typo-14-bold"
      : "button-default typo-16-medium";
  return <button className={`button ${sizeClass}`}>{children}</button>;
}
