// Date utilities
export const calculateDDay = (createdAt) => {
  const today = new Date();
  const createdDate = new Date(createdAt);
  const diffTime = today - createdDate;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Number utilities
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
