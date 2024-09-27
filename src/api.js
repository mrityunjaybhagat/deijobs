const baseURL = process.env.REACT_APP_API_BASE_URL;

export const fetchWorkModes = async () => {
  const response = await fetch(`${baseURL}work-modes`);
  if (!response.ok) {
    throw new Error("Failed to fetch work modes");
  }
  return response.json();
};

export const fetchSalaryRanges = async () => {
  const response = await fetch(`${baseURL}salary-ranges`);
  if (!response.ok) {
    throw new Error("Failed to fetch salary ranges");
  }
  return response.json();
};

export const fetchPostedBy = async () => {
  const response = await fetch(`${baseURL}posted-by`);
  if (!response.ok) {
    throw new Error("Failed to fetch posted by");
  }
  return response.json();
};

export const fetchCompanyTypes = async () => {
  const response = await fetch(`${baseURL}company-types`);
  if (!response.ok) {
    throw new Error("Failed to fetch company types");
  }
  return response.json();
  
};

export const fetchFreshness = async () => {
  const response = await fetch(`${baseURL}freshness`);
  if (!response.ok) {
    throw new Error("Failed to fetch freshness");
  }
  return response.json();
};

export const fetchJobRoles = async () => {
  const response = await fetch(`${baseURL}job-roles`);
  if (!response.ok) {
    throw new Error("Failed to fetch job roles");
  }
  return response.json();
};
