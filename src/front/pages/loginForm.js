const loginForm = ()=>{
    return(
        <>
            <div className="bg-white text-black p-3 form_div">
                              <h2 className="text-black text-2xl font-semibold leading-8">
                                  Portal to connect D&I Job <br/>Seekers with Diversity <br/>Hiring Organisations
                              </h2>
                              <div className="login-container">
                                  <div className="login-form">
                                      <h2>Login</h2>
                                      <form onSubmit={handleSendOtp}>
                                      <div className="form-group">
                                          <label htmlFor="mobileNumber">Mobile Number</label>
                                          <input
                                          type="tel"
                                          id="mobileNumber"
                                          value={mobileNumber}
                                          onChange={handleMobileChange}
                                          className="form-control"
                                          placeholder="Enter your mobile number"
                                          required
                                          />
                                      </div>
                                      <button className="btn btn-primary btn-full text-white text-sm">Continue</button>
                                      </form>
                                      {error && <p className="error-message">{error}</p>}
                                      {successMessage && <p className="success-message">{successMessage}</p>}
                                      <div class="divider"><span></span><span>OR</span><span></span></div>
                                      <button className='btn btn-trans btn-full btn-google'>Continue With Google</button>
                                  </div>
                              </div>
                              <a href=''>By continuing you agree to have read and accept the Terms & Conditions and Privacy Policy</a>
                              <button className='btn btn-primary btn-full text-white text-sm'>Continue with  Linkedin</button>
                          </div>
        </>
    );
}