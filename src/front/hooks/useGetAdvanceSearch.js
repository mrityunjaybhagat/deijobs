import { useQuery } from "react-query";
import { fetchMasterData } from "@/services/OtherService";

const useGetData = (queryKey, endpoint) => {
  return useQuery(queryKey, () => fetchMasterData(endpoint));
};

const useGetAdvanceSearch = () => {
  const workModesOptions = useGetData("workModes", "work-modes");
  const salaryRangesOptions = useGetData("salaryRanges", "salary-ranges");
  const postedByOptions = useGetData("postedBy", "posted-by");
  const companyTypesOptions = useGetData("companyTypes", "company-types");
  const freshnessOptions = useGetData("freshness", "freshness");
  const jobRolesOptions = useGetData("jobRoles", "job-roles");

  return {
    workModesOptions,
    salaryRangesOptions,
    postedByOptions,
    companyTypesOptions,
    freshnessOptions,
    jobRolesOptions,
  };
};

export default useGetAdvanceSearch;
