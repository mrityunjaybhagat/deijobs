const BASE_URL = "https://deijobs.in/deijobs-api/api";

export const fetchData = async (endpoint, options) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const postData = async (endpoint, data) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Function to send OTP
export const sendOtp = async (mobileNumber) => {
  try {
    const response = await fetch(`${BASE_URL}/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobileNumber }),
    });

    if (!response.ok) {
      throw new Error("Failed to send OTP. Please try again later.");
    }

    return response.json(); // or return a success flag or similar
  } catch (error) {
    throw error;
  }
};
// Function to verify OTP
export const verifyOtp = async (mobileNumber, completeOtp) => {
  try {
    const response = await fetch(`${BASE_URL}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobileNumber, otp: completeOtp }),
    });

    const otpResponse = await response.json();

    if (response.ok) {
      if (otpResponse.code === 200 && otpResponse?.login_token) {
        // Store login_token and userId
        localStorage.setItem("login_token", otpResponse.login_token);
        // localStorage.setItem("userId", otpResponse.userId);

        const studentResumeExists = otpResponse?.studentResumeExist;
        const studentProfileExist = otpResponse?.studentProfileExist;

        return {
          success: true,
          data: {
            studentResumeExists,
            studentProfileExist,
          },
        };
      } else {
        return {
          success: false,
          message: otpResponse.message || "OTP verification failed.",
        };
      }
    } else {
      throw new Error("Failed to verify OTP. Please try again.");
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

//Upload Resume

export async function uploadResume(data) {
  const url = "get-text-pdf";
  try {
    const response = await fetchData(url, {
      method: "POST",
      body: data,
    });
    return response;
  } catch (error) {
    console.error("Error uploading resume:", error);
    throw error;
  }
}