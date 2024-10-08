/**
 * 주어진 날짜로부터 현재까지의 디데이를 계산
 * @param {string} createdAt - 시작 날짜 문자열
 * @returns {string} 'D+일수' 형식의 문자열
 */
export const calculateDDay = (createdAt) => {
  const today = new Date();
  const createdDate = new Date(createdAt);
  const diffTime = today - createdDate;
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `D+${days}`;
};

/**
 * 큰 숫자를 짧게 포맷팅
 * @param {number} num - 포맷팅할 숫자
 * @returns {string} 포맷팅된 문자열
 */
export const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
};

export const formatMoment = (string) => {
  const year = string.slice(2, 4);
  const month = string.slice(5, 7);
  const day = string.slice(8, 10);
  return `${year}.${month}.${day}`;
};
