import { useQuery } from "react-query";
import { fetchMasterData } from "@/services/OtherService";

const useGetData = (queryKey, endpoint) => {
  return useQuery(queryKey, () => fetchMasterData(endpoint));
};

const useGetProfileDropdown = () => {
  const DIOptions = useGetData("DI", "get-preference-category-list");
  const experienceOption = useGetData("experience", "experience-range");
  const rolesOption = useGetData("roles", "job-roles");

  return {
    DIOptions,
    experienceOption,
    rolesOption,
  };
};

export default useGetProfileDropdown;
