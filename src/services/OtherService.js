import { fetchData } from "./apiService";

export async function getTestingMonials(mobileNumber, otp) {
  const url = `/api/get-testimonials`;

  try {
    const response = await fetchData(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
    });

    return response;
  } catch (error) {
    // Handle error
    console.error("Error getting testing monials jobs:", error);
    throw error;
  }
}

export async function getStudentProfile(data) {
  const url = `/api/get-profile-data`;

  try {
    const response = await fetchData(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
    });

    return response;
  } catch (error) {
    // Handle error
    console.error("Error creating student profile:", error);
    throw error;
  }
}

export async function updateStudentProfile(data) {
  const url = `/api/update-student-profile`;

  try {
    const response = await fetchData(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
    });

    return response;
  } catch (error) {
    // Handle error
    console.error("Error creating student profile:", error);
    throw error;
  }
}

export async function updateStudentPreferences(data) {
  const url = `/api/add-student-prefrence-data`;

  try {
    const response = await fetchData(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
    });

    return response;
  } catch (error) {
    // Handle error
    console.error("Error creating student preferences:", error);
    throw error;
  }
}

export async function createStudentProfile(data) {
  const url = `/api/create-student-profile`;

  try {
    const response = await fetchData(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
    });

    return response;
  } catch (error) {
    // Handle error
    console.error("Error creating student profile:", error);
    throw error;
  }
}

export async function getHomePageData(data) {
  const url = `/api/get-homepage-data`;

  try {
    const response = await fetchData(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
    });

    return response;
  } catch (error) {
    // Handle error
    console.error("Error creating student profile:", error);
    throw error;
  }
}

export async function subscribeNewsLetter(data) {
  const url = `/api/subscribe-newsletter`;

  try {
    const response = await fetchData(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
    });

    return response;
  } catch (error) {
    // Handle error
    console.error("Error creating student profile:", error);
    throw error;
  }
}

export async function saveJob(data) {
  const url = `/api/user-job-action`;

  try {
    const response = await fetchData(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
    });

    return response;
  } catch (error) {
    // Handle error
    console.error("Error creating student profile:", error);
    throw error;
  }
}

export async function getNewJobList(data) {
  const url = `/api/get-new-job-list?`;

  try {
    const response = await fetchData(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
    });

    return response;
  } catch (error) {
    // Handle error
    console.error("Error creating student profile:", error);
    throw error;
  }
}

export async function getTopCompanies(data) {
  const url = "/api/top-companies-list";

  try {
    const response = await fetchData(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
    });

    return response;
  } catch (error) {
    // Handle error
    console.error("Error creating student profile:", error);
    throw error;
  }
}

export async function getRecommendedJob(data) {
  const url = `/api/recommended-job-list`;
  try {
    const response = await fetchData(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching recommended jobs:", error);
    throw error;
  }
}

export async function searchJobs(data) {
  const url = "/api/get-filtered-job-list";

  try {
    const response = await fetchData(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
    });

    return response;
  } catch (error) {
    // Handle error
    console.error("Error creating student profile:", error);
    throw error;
  }
}

export async function getJobDetails(data) {
  const url = "/api/get-candidate-job-details";

  try {
    const response = await fetchData(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
    });

    return response;
  } catch (error) {
    // Handle error
    console.error("Error getting job details:", error);
    throw error;
  }
}

export async function postData(endpoint, data) {
  const url = "/api/" + endpoint;

  try {
    const response = await fetchData(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error getting job details:", error);
    // throw error;
  }
}
export async function postVerification(endpoint, data) {
  const url = "/api/" + endpoint;

  try {
    const response = await fetchData(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
}

export async function getSimilarJobs(data) {
  //   {
  //     "jobId": 2,
  //     "limit": 1,
  //     "offset": 0
  // }

  const url = "/api/get-similar-job-list";

  try {
    const response = await fetchData(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
    });
    return response;
  } catch (error) {
    // Handle error
    console.error("Error getting similar jobs:", error);
    throw error;
  }
}

export async function uploadResume(data) {
  const url = "/api/get-text-pdf";

  try {
    const response = await fetchData(url, {
      method: "POST",
      body: data,
      headers: {
        // "Content-Type": "multipart/form-data", // Set the appropriate content type
      },
    });
    return response;
  } catch (error) {
    // Handle error
    console.error("Error uploading resume:", error);
    throw error;
  }
}

export const fetchMasterData = async (endpoint, data = null) => {
  const url = "/api/" + endpoint;

  try {
    const response = await fetchData(url, {
      method: "GET",
      body: data,
      headers: {
        // "Content-Type": "multipart/form-data", // Set the appropriate content type
      },
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error uploading resume:", error);
    throw error;
  }
};

export async function getUserData(data) {
  const url = "/api/get-profile-data";

  try {
    const response = await fetchData(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    // Handle error
    console.error("Error uploading resume:", error);
    throw error;
  }
}
export const getData = async (endpoint) => {
  const url = "/api/" + endpoint;

  try {
    const response = await fetchData(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
    });
    return response;
  } catch (error) {
    // Handle error
    console.error("Error uploading resume:", error);
    throw error;
  }
};
