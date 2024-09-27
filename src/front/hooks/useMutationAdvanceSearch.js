import { searchJobs } from "@/services/OtherService";
import { useMutation, useQueryClient } from "react-query";
// import { } from "@/services/OtherService"; //import the api

const useMutationAdvanceSearch = () => {
  const mutation = useMutation(
    (payload) => {
      return searchJobs(payload);
    },
    {
      onSuccess: () => {
        //queries after a successful mutation
      },
    }
  );

  return mutation;
};

export default useMutationAdvanceSearch;
