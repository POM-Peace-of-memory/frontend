import { useState } from "react";

export const useLoadData = (fetchFunction) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({
    isPublic: true,
    order: "mostLiked",
  });

  const handleLoad = async (options) => {
    setIsLoading(true);
    let result;
    try {
      result = await fetchFunction(options);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    console.log(result);
    const { currentPage, totalPages, data } = result;
    if (Number(currentPage) === 1) {
      setData(data);
    } else {
      setData((prevData) => [...prevData, ...data]);
    }
    setPage(Number(currentPage) + 1);
    setDisabled(Number(currentPage) === totalPages || !totalPages);
  };

  return { data, page, disabled, filter, setFilter, handleLoad, isLoading };
};
