import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import CustomButton from "../component/form/CustomButton";
import MobileNumberInput from "../component/form/mobile_number_input";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const validateMobileNumber = (number) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(number);
  };

  const handleSendOtp = () => {
    if (!validateMobileNumber(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setError("");

    // Simulate OTP sending process
    fetch("https://deijobs.in/deijobs-api/api/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobileNumber }),
    })
      .then((response) => {
        if (response.ok) {
          setOtpSent(true);
          // Navigate to OTP verification screen
          navigate("/verify-mobile", { state: { mobileNumber } });
        } else {
          throw new Error("Failed to send OTP. Please try again later.");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <section>
      <div className="">
        <div className="row">
          {isDesktopOrLaptop && (
            <>
              <div className="col login_left">
                <img
                  src="/assets/images/Group 1707478927.png"
                  className="w-full"
                />
              </div>
            </>
          )}
          <div className="col col-xs-12 login_right">
            <div className="col-md-10 offset-md-1">
              <div className="bg-white text-black p-3 form_div">
                <h2 className="text-black text-2xl font-semibold leading-8">
                  Portal to connect D&I Job <br />
                  Seekers with Diversity <br />
                  Hiring Organisations
                </h2>
                <div className="login-container">
                  <div className="login-form">
                    {/* Form Starts Here */}
                    <h2>Login</h2>
                    <div>
                      <label htmlFor="mobileNumber">Mobile Number:</label>
                      <input
                        type="text"
                        id="mobileNumber"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        maxLength={10}
                        placeholder="Enter your mobile number"
                        className="form-control"
                      />
                      {error && <p style={{ color: "red" }}>{error}</p>}

                      <CustomButton
                        onClick={handleSendOtp}
                        label={"Continue"}
                        classname={
                          "full-width btn btn-primary btn-full text-white text-sm"
                        }
                      />
                      {/* <button onClick={handleSendOtp}>
        {otpSent ? 'OTP Sent' : 'Send OTP'}
      </button> */}
                      {/* Form Starts Here */}
                    </div>
                  </div>
                </div>
                <a href="">
                  By continuing you agree to have read and accept the Terms &
                  Conditions and Privacy Policy
                </a>
                <button className="btn btn-primary btn-full text-white text-sm">
                  Continue with Linkedin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
