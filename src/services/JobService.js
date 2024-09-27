import { fetchData } from "./apiService";

export async function getAllJobs(endpoint, payload) {
  const url = `/api/` + endpoint;
  try {
    const jobsResponse = await fetchData(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return jobsResponse;
  } catch (error) {
    console.error("Error getting featured jobs:", error);
    throw error;
  }
}

export async function getJobRoles() {
  const url = `/api/job-roles`;

  try {
    const featuredJobsResponse = await fetchData(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return featuredJobsResponse;
  } catch (error) {
    console.error("Error getting featured jobs:", error);
    throw error;
  }
}
