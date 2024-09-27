// services/userService.js
import { fetchData } from "./apiService";

export async function sendOtp(mobileNumber) {
  const url = `/api/send-otp`;

  try {
    // Pass mobileNumber as a parameter to fetchData
    const sendOtpResponse = await fetchData(url, {
      method: "POST", // You may need to specify the HTTP method (e.g., POST) if required
      body: JSON.stringify({ mobileNumber }), // Include the mobileNumber in the request body
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
    });
    return sendOtpResponse;
  } catch (error) {
    // Handle error
    console.error("Error sending OTP:", error);
    throw error; // Rethrow the error to handle it at a higher level if needed
  }
}

export async function verifyOtp(mobileNumber, otp) {
  const url = `/api/verify-otp`;

  try {
    // Pass mobileNumber and otp as parameters to fetchData
    const verifyOtpResponse = await fetchData(url, {
      method: "POST", // You may need to specify the HTTP method (e.g., POST) if required
      body: JSON.stringify({ mobileNumber, otp }), // Include the mobileNumber and otp in the request body
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
    });

    return verifyOtpResponse;
  } catch (error) {
    // Handle error
    console.error("Error verifying OTP:", error);
    throw error; // Rethrow the error to handle it at a higher level if needed
  }
}
