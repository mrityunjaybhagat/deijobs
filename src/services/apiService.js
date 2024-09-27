// services/apiService.js
import { postData } from "./OtherService";
export async function fetchData(url, options = {}) {
  try {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    url = `${BASE_URL}${url}`;

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    if (data?.code == 700) {
      window.location.href = "/login";
      postData("logout", {
        userId: localStorage.getItem("userId"),
      });
      localStorage.clear();
      // navigate("/login");
    }
    return data;
  } catch (error) {
    throw new Error(`An error occurred: ${error.message}`);
  }
}
