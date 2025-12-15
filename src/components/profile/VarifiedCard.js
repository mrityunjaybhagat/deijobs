import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVarificationData, sendEmailOtp } from '../../services/profileServices';
import icons from "../../assets/icons";

const VarifiedCard = () => {
  const [verificationData, setVerificationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailMessage, setEmailMessage] = useState(""); // State for email OTP status
  const navigate = useNavigate();
  const userId = localStorage.getItem('login_token');

  useEffect(() => {
    if (userId) {
      const fetchVerificationData = async () => {
        try {
          const data = await getVarificationData(userId);
          setVerificationData(data);
        } catch (error) {
          setError('Failed to fetch verification data');
        } finally {
          setLoading(false);
        }
      };
      fetchVerificationData();
    }
  }, [userId]);

  //Send Email OTP
  const handleEmailOtp = async () => {
    try {
      const response = await sendEmailOtp(userId, verificationData?.email); // Pass userId and email as parameters
      if (response) {
        navigate("/verification/email");
      }
    } catch (error) {
      setEmailMessage("Failed to send OTP. Please try again.");
      console.error('Failed to send OTP:', error);
    }
  };

  // const handleEmailOtp = async (e) => {
  //   e.preventDefault(); // Prevent link navigation
  //   setEmailMessage(""); // Reset the message before sending the OTP
  //   try {
  //     const response = await sendEmailOtp(userId, verificationData?.email);
  //     if (response) {
  //       setEmailMessage("OTP sent successfully. Please check your email.");
  //       navigate("/verification/email");
  //     } else {
  //       setEmailMessage("Failed to send OTP. Please try again.");
  //     }
  //   } catch (error) {
  //     setEmailMessage("Failed to send OTP. Please try again.");
  //     console.error('Failed to send OTP:', error);
  //   }
  // };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {verificationData && (
        <>
          <div className='card no-border shadow'>
            <div className="card-head">
              <h3 className="card-title">Account</h3>
            </div>

            <div className="card w-100">
              <div className='d-flex justify-content-between align-items-center'>
                <p>Email Address</p>
                {verificationData.emailStatus === "Verified" ? (
                  <div className="d-flex items-center cursor-pointer gap-1">
                    <div className="text-lime-700 text-sm font-medium font-['Lexend'] leading-none">Verified</div>
                    <img src={icons["check-circle-2.svg"]} alt="verification status" />
                  </div>
                ) : (
                  <a href="#" className="d-flex items-center cursor-pointer gap-1" onClick={handleEmailOtp}>
                    <div className="text-lime-700 text-sm font-medium font-['Lexend'] leading-none">Not Verified</div>
                    <img src={icons["alert-triangle.svg"]} alt="verification status" />
                  </a>
                )}
              </div>
              <p>{verificationData?.email}</p>
              {/* Display the OTP send message */}
              {emailMessage && (
                <p style={{ color: emailMessage.includes("Failed") ? "red" : "green" }}>
                  {emailMessage}
                </p>
              )}
            </div>

            <div className="card w-100">
              <div className='d-flex justify-content-between align-items-center'>
                <p>Phone Number</p>
                {verificationData.mobileStatus === "Verified" ? (
                  <div className="d-flex justify-content-between align-items-center cursor-pointer gap-1">
                    <div className="text-lime-700 text-sm font-medium font-['Lexend'] leading-none">Verified</div>
                    <img src={icons["check-circle-2.svg"]} alt="verification status" />
                  </div>
                ) : (
                  <div className="d-flex items-center cursor-pointer gap-1">
                    <div className="text-lime-700 text-sm font-medium font-['Lexend'] leading-none">Not Verified</div>
                    <img src={icons["alert-triangle.svg"]} alt="verification status" />
                  </div>
                )}
              </div>
              <p>{verificationData?.mobile}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VarifiedCard;
