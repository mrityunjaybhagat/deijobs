import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UplaodCloud from '../../assets/icons/upload-cloud.svg';
import CustomButton from '../../components/form/CustomButton';
import PrimaryButton from '../../components/form/PrimaryButton';
import { uploadResume } from '../../services/apiServices';
import pdfToText from "react-pdftotext";

const UploadResume = () => {
  const userId = localStorage.getItem('login_token');
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [extractedData, setExtractedData] = useState(null); // New state to show extracted data
  const location = useLocation();
  const navigate = useNavigate();

  const mobileNumber = location.state?.mobileNumber || "";

  const handleFileChange_ = (e) => {
    const file = e.target.files[0];
    validateFile(file);
  };

const handleFileChange = (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) {
    setErrorMessage('No file selected.');
    setUploadMessage('');
    return;
  }
  validateFile(file);
};

  const validateFile_bkp = (file) => {
    const allowedFormats = [".pdf", ".docx", ".doc", ".txt"];
    const fileExtension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
    if (allowedFormats.includes(`.${fileExtension}`)) {
      setSelectedFile(file);
      setErrorMessage('');
      setUploadMessage(file.name);
    } else {
      setErrorMessage('Invalid file format. Please upload a .pdf, .doc, .docx, or .txt file.');
      setUploadMessage('Incorrect File Format');
    }
  };
const validateFile = (file) => {
  const allowedFormats = [".pdf", ".docx", ".doc", ".txt"];
  const fileExtension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
  if (allowedFormats.includes(`.${fileExtension}`)) {
    setSelectedFile(file);
    setErrorMessage('');
    setUploadMessage(file.name);
  } else {
    setErrorMessage('Invalid file format. Please upload a .pdf, .doc, .docx, or .txt file.');
    setUploadMessage('Incorrect File Format');
  }
};

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    validateFile(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select a file to upload.');
      return;
    }
try {
  // Prepare form data for backend
  const formData = new FormData();
  formData.append('file', selectedFile);
  formData.append('userId', userId); // send userId if backend expects it

  // Call the backend API to parse resume
  const response = await uploadResume(formData);
  console.log('Server Response:', response);

  if (response && response.code === 200) {
    // Use backend parsed data
    const extracted = response.data;
    console.log("Extracted Data (from backend):", extracted);
    setExtractedData(extracted);
    setErrorMessage(""); // clear old errors

    // Navigate to next page with extracted data
    navigate("/create-profile", {
      state: {
        ...extracted,
        mobile: extracted.mobile || mobileNumber
      }
    });
  } else if (response && response.code === 700) {
    setErrorMessage("Invalid token. Please login again.");
  } else {
    // Show the actual backend message if available
    const msg = response?.message || "Failed to parse resume. Please try again.";
    setErrorMessage(msg);
  }
} catch (error) {
  console.error("Error uploading or parsing resume:", error);
  setErrorMessage('An error occurred while extracting data from the CV. Please try again.');
}
  };

  const handleSkip = () => {
    navigate('/create-profile');
  };

  return (
    <>
      <section className='content'>
        <div className='container'>
          <div className='upload_container container_box card'>
            <h2>Upload Your Resume</h2>
            <p>Save time with super-fast Profile Auto-Fill feature when you Upload your Resume</p>

            <div
              className={`uploadbox ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragLeave={() => setIsDragging(false)}
            >
              <div className='card shadow p-4'>
                <div className='uploadbox_inr'>
                  <img src={UplaodCloud} alt='Upload Cloud' />
                  <p><strong>Supported File Formats</strong></p>
                  <p>(.pdf, .docx, .doc, .txt)</p>
                  {uploadMessage && <p>Selected File: {uploadMessage}</p>}
                  <input 
                    type="file" 
                    className="upload_file" 
                    onChange={handleFileChange} 
                    accept=".pdf, .doc, .docx, .txt" 
                  />
                </div>
                <div className='upload_button mt-3'>
                  <PrimaryButton 
                    text='Upload Resume' 
                    onClick={handleFileUpload} 
                    className='btn btn-sm' 
                  />
                </div>
              </div>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              {uploadSuccess && <p style={{ color: 'green' }}>File uploaded successfully!</p>}
              {extractedData && (
                <div className='mt-3'>
                  <h5>Extracted Resume Data:</h5>
                  <ul>
                    <li><strong>Name:</strong> {extractedData.name}</li>
                    <li><strong>Email:</strong> {extractedData.email}</li>
                    <li><strong>Date of Birth:</strong> {extractedData.dob}</li>
                    <li><strong>Experience:</strong> {extractedData.experience}</li>
                  </ul>
                </div>
              )}
            </div>

            <CustomButton 
              text='Skip & Add Details Manually' 
              btnclassName='btn-white' 
              onClick={handleSkip} 
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default UploadResume;
