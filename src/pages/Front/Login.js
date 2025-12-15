import React, { useState, useEffect, useRef } from 'react';
import { useResponsive } from '../../config/responsive';
import Divider from '../../components/ui/Divider';
import loginImg from "../../assets/images/Group 1707478927.png";
import PrimaryButton from '../../components/form/PrimaryButton';
import InputWithIcon from '../../components/form/InputWithIcon';
import { sendOtp } from '../../services/apiServices';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const LoginPage = () => {
  const { isDesktopOrLaptop } = useResponsive();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const [checkboxError, setCheckboxError] = useState(false); // To show error for checkbox
  const mobileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Focus the mobile number input field when the component loads
    if (mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Allow only digits
    const onlyNumbers = value.replace(/\D/g, '');

    // Update mobile number state with only digits
    setMobileNumber(onlyNumbers);
    // Check if the length is exactly 10 digits and enable the button
    if (onlyNumbers.length === 10) {
      setIsButtonDisabled(false); // Enable button if valid
    } else {
      setIsButtonDisabled(true); // Disable button if invalid
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const checkbox = document.getElementById('termsCheckbox');
    if (!checkbox.checked) {
      setCheckboxError(true); // Show error message if not checked
    } else {
      setCheckboxError(false); // Clear error if checked
      try {
        await sendOtp(mobileNumber); // Call the service function
        navigate("/verify-mobile", { state: { mobileNumber } });
      } catch (error) {
        setError(error.message);
      }
    }
  };

  // const handleGoogleLogin = () => {
  //   const BASE_URL = 'https://deijobs.in/deijobs-api';
  //   window.location.href = `${BASE_URL}/google-login`;
  // };
  return (
    <>
      <Helmet>
        <title>DEI Jobs Login – Access Your Account & Apply Jobs</title>
        <meta name="description" content="Sign in to DEI Jobs to apply quickly, track applications, and explore the latest openings across industries and locations in India."/>
      </Helmet>
      <section className='' style={{ padding: '0px' }}>
        <div className={`${isDesktopOrLaptop ? 'row' : 'container'}`}>
          {isDesktopOrLaptop && (
            <div className="login_intro col-md-6">
              <img src={loginImg} alt="" />
            </div>
          )}
          <div className="col-md-6 py-5">
            <div className='login_form'>
              <div className='card py-3'>
                <h2>Portal to connect DEI Job Seekers with Diversity Hiring Organisations</h2>
                <InputWithIcon icon={' +91 '}>
                  <input
                    ref={mobileInputRef} // Attach ref to the mobile input field
                    type='tel' // Using 'tel' to hint mobile input on mobile devices
                    className='form-control'
                    placeholder='Enter your mobile number'
                    value={mobileNumber}
                    onChange={handleInputChange}
                    maxLength={10} // Ensures users can't type more than 10 digits
                  />
                </InputWithIcon>

                <div className='form-check d-flex align-top gap-2 mb-2'>
                  <input
                    type='checkbox'
                    className='form-control_ form-check-input'
                    id="termsCheckbox"
                    required // Make it required
                  />
                  <label className="form-check-label" htmlFor="termsCheckbox">
                    By continuing you agree to have read and accept the
                    <a href='/t&c'> Terms & Conditions </a> and 
                    <a href='/privacy_policy'> Privacy Policy.</a>
                  </label>
                </div>

                {checkboxError && (
                  <p style={{ color: 'red', fontSize: '12px' }}>
                    Please accept the Terms & Conditions and Privacy Policy to continue.
                  </p>
                )}

                <div className=''>
                  <PrimaryButton text='Continue' disabled={isButtonDisabled} onClick={handleSubmit} />
                </div>

                <div className='form-row'>
                  <Divider />
                </div>

                {/* <div className='form-row'>
                  <CustomButton text='Continue with Google' btnclassName='btn-google' btnIcon={icons["googleBtnImg.svg"]}  onClick={handleGoogleLogin}/>
                </div> */}

                {/* <div className='form-row'>
                  <CustomButton text='Continue with LinkedIn' btnclassName='btn-linkedin' btnIcon={icons["linkedInBtn.svg"]} />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
