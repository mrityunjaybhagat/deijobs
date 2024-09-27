import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CustomButton from "../component/form/CustomButton";
import { useMediaQuery } from "react-responsive";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [timer, setTimer] = useState(30);
  const [showResendButton, setShowResendButton] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const mobileNumber = location.state?.mobileNumber || "";

  useEffect(() => {
    // Enable the Verify button only if all OTP fields are filled
    setIsButtonDisabled(otp.some((digit) => digit === ""));
  }, [otp]);

  useEffect(() => {
    // Timer countdown logic
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setShowResendButton(true);
    }
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus the next input field
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleVerifyOtp = () => {
    const completeOtp = otp.join("");
    if (completeOtp.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }
    setError("");
    // OTP verification process
    fetch("https://deijobs.in/deijobs-api/api/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobileNumber, otp: completeOtp }),
    })
      .then((response) => response.json())
      .then((otpResponse) => {
        if (otpResponse.code === 200) {
          localStorage.setItem("login_token", otpResponse?.login_token);
          //localStorage.setItem("userId", otpResponse?.userId);
          const studentResumeExists = otpResponse?.studentResumeExist;
          const studentProfileExist = otpResponse?.studentProfileExist;

          if (studentResumeExists) {
            navigate("/create-profile");
          } else if (studentProfileExist) {
            navigate("/jobs");
          } else {
            navigate("/upload-resume");
          }
        } else {
          setOtpMessage(otpResponse.message);
        }
      })
      .catch((error) => {
        setError("Failed to verify OTP. Please try again.");
      });
  };

  const handleChangeMobileNumber = () => {
    // Navigate back to the login page to change the mobile number
    navigate("/login");
  };

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <section>
      <div className="">
        <div className="row">
          {isDesktopOrLaptop && (
            <div className="col login_left">
              <img
                src="/assets/images/Group 1707478927.png"
                className="w-full"
                alt="Login Visual"
              />
            </div>
          )}
          <div className="col col-xs-12 login_right">
            <div className="col-md-10 offset-md-1">
              <div className="bg-white text-black p-3 form_div">
                <h2 className="text-black text-2xl font-semibold leading-8">
                  Verify your mobile
                </h2>
                <div className="login-container">
                  <div className="login-form">
                    <div>
                      <label htmlFor="otp">
                        Enter verification code sent on <strong>{mobileNumber}</strong>
                      </label>
                      <button
                        onClick={handleChangeMobileNumber}
                        className="btn btn-link"
                      >
                        Change
                      </button>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          marginBottom: "10px",
                        }}
                      >
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-input-${index}`}
                            type="text"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            maxLength={1}
                            className="otp-input"
                            style={{
                              width: "40px",
                              height: "40px",
                              textAlign: "center",
                              fontSize: "18px",
                            }}
                            placeholder="."
                          />
                        ))}
                      </div>
                      {error && <p style={{ color: "red" }}>{error}</p>}
                      Haven’t received code?
                      {showResendButton ? (
                        <button
                          onClick={handleVerifyOtp}
                          className="btn btn-secondary text-white"
                        >
                          Resend OTP
                        </button>
                      ) : (
                        <p>Resend OTP in {timer} seconds</p>
                      )}
                      {otpMessage && <p style={{ color: "red" }}>{otpMessage}</p>}
                    </div>
                    <CustomButton
                      onClick={handleVerifyOtp}
                      label={"Verify"}
                      classname={"btn btn-primary text-white w-full"}
                      disabled={isButtonDisabled}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtp;
