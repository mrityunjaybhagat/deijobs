import React, { useState, useEffect } from "react";
import { useResponsive } from '../../config/responsive';
import { useNavigate, useLocation } from "react-router-dom";
import PrimaryButton from '../../components/form/PrimaryButton';
import loginImg from "../../assets/images/Group 1707478927.png";
import { verifyOtp } from '../../services/apiServices'; // Ensure you have this service function

const VerifyOtp = () => {
  const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [showResendButton, setShowResendButton] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const mobileNumber = location.state?.mobileNumber || "";

  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {  // Accept only digits
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // Move to next input if the current input is filled
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  // Handle backspace and move to previous input
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        prevInput?.focus();
      }
      const updatedOtp = [...otp];
      updatedOtp[index] = ""; // Clear current input
      setOtp(updatedOtp);
    }
  };

  // Enable the Verify button only if all OTP fields are filled
  useEffect(() => {
    setIsButtonDisabled(otp.some((digit) => digit === ""));
  }, [otp]);

  // Timer countdown logic
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setShowResendButton(true);
    }
  }, [timer]);
  // Navigate back to the login page to change the mobile number
  const handleChangeMobileNumber = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  // Function to handle OTP verification
  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const completeOtp = otp.join(""); // Join the OTP array into a string

    try {
      const result = await verifyOtp(mobileNumber, completeOtp);
      if (result.success) {
        const { studentResumeExists, studentProfileExist } = result.data;
        // if (studentResumeExists) {
        //   navigate("/create-profile");
        // } else if (studentProfileExist) {
        //   navigate("/jobs");
        // } else {
        //    //navigate("/create-profile");
        //   navigate("/upload-resume");
        // }
        if (studentProfileExist) {
          navigate("/jobs");
        } else if (studentResumeExists) {
          navigate("/create-profile");
        } else {
          navigate("/upload-resume");
        }
      } else {
        setOtpMessage(result.message);
      }
    } catch (error) {
      setError("Failed to verify OTP. Please try again.");
      console.error(error); // Log error for debugging
    }
  };

  return (
    <>
      <section className='' style={{padding:'0px'}}>
        <div className={`${isDesktopOrLaptop ? 'row' : 'container'}`}>
        {isDesktopOrLaptop && (
            <div className="login_intro col-md-6">
              <img src={loginImg} alt=""/>
            </div>
          )}
            <div className="col-md-6 py-5">
              <div className='login_form'>
              <div className="card py-3">
                <h2>Verify Your Mobile</h2>
                <div className="d-flex mb-2" style={{justifyContent:'space-between',alignItems:'center'}}>
                  <label>
                    Enter verification code sent to <strong>{mobileNumber}</strong>
                  </label>
                  <button className="btn btn-link" onClick={handleChangeMobileNumber}>Change</button>
                </div>

                <div className="d-flex gap-2 py-5">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      type="text"
                      className="otp-input form-control"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  ))}
                </div>

                <div className='d-flex py-3' style={{justifyContent:'space-between',alignItems:'center'}}>
                  <p style={{margin:'0'}}>Haven’t received the code?</p>
                  {showResendButton ? (
                    <button
                      onClick={handleOtpVerification}
                      className="btn btn-sm btn-light text-white"
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <p><strong>00.{timer}</strong></p>
                  )}
                  {otpMessage && <p style={{ color: "red" }}>{otpMessage}</p>}
                </div>

                <div className='py-3'>
                  <PrimaryButton text='Continue' disabled={isButtonDisabled} onClick={handleOtpVerification} />
                </div>

                {error && <p className="text-danger">{error}</p>}
                </div>
              </div>
            </div>
          </div>
      </section>
    </>
  );
};

export default VerifyOtp;
