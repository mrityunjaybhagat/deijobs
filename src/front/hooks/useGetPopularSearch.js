import { getData } from "@/services/OtherService";
import { useQuery } from "react-query";

const useGetPopularSearch = () => {
  const {
    data: popularSearch,
    isLoading,
    error,
    refetch,
  } = useQuery("popular-search", () => getData("get-popular-search"), {
    enabled: false,
  });
  return { popularSearch, isLoading, error, refetch };
};

export default useGetPopularSearch;
