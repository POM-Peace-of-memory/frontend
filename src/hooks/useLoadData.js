import { useState } from "react";

export const useLoadData = (fetchFunction) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [filter, setFilter] = useState({
    isPublic: true,
    search: "",
    order: "mostLiked",
  });

  const handleLoad = async (options) => {
    let result;
    try {
      result = await fetchFunction(options);
    } catch (error) {
      console.log(error);
    }
    const { currentPage, totalPages, data } = result;
    if (currentPage === 1) {
      setData(data);
    } else {
      setData((prevData) => [...prevData, ...data]);
    }

    setPage(currentPage + 1);
    setDisabled(currentPage === totalPages);
  };

  return { data, page, disabled, filter, setFilter, handleLoad };
};
