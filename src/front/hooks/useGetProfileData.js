import { getUserData } from "@/services/OtherService";
import { useQuery } from "react-query";

const useGetProfileData = (payload) => {
  const { data, isLoading, error } = useQuery(
    ["getProfileData", payload],
    () => getUserData(payload),
    {
      enabled: !!payload.userId,
    }
  );
  return { data, isLoading, error };
};

export default useGetProfileData;
