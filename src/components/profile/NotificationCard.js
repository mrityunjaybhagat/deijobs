import React, { useState, useEffect } from 'react';
import { getPlatformSettings, updatePlatformSettings } from '../../services/profileServices';

const JobAlertToggle = () => {
  const userId = localStorage.getItem('login_token');
  const [jobAlertsEnabled, setJobAlertsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch the current platform settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getPlatformSettings(userId);
        if (response.code === 200 && response.data) {
          setJobAlertsEnabled(response.data.job_alerts === 1); // Set switch based on job_alerts value
        }
      } catch (error) {
        console.error("Error fetching platform settings:", error);
        setError("Failed to load platform settings");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [userId]);

  // Handle the toggle switch change
  const handleToggle = async () => {
    const newStatus = jobAlertsEnabled ? 0 : 1; // Toggle the current status
    setJobAlertsEnabled(!jobAlertsEnabled); // Optimistically update the UI state
    setSuccessMessage(''); // Reset success message
    try {
      const response = await updatePlatformSettings(userId, newStatus); // Send userId and newStatus
      if (response.code === 200) {
        setSuccessMessage(`Job alerts have been ${newStatus === 1 ? 'enabled' : 'disabled'}.`); // Set success message
      } else {
        throw new Error('Failed to update settings');
      }
    } catch (error) {
      console.error("Error updating job alerts status:", error);
      setJobAlertsEnabled(!jobAlertsEnabled); // Revert to previous state on error
      setError("Failed to update job alerts status");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='card'>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="jobAlertsSwitch"
          checked={jobAlertsEnabled}
          onChange={handleToggle} // Call the toggle function on change
        />
        <label className="form-check-label" htmlFor="jobAlertsSwitch">
          Job Alerts
        </label>
        {error && <div className="text-danger">{error}</div>} {/* Show error message if any */}
        {successMessage && <div className="text-success">{successMessage}</div>} {/* Show success message */}
      </div>
    </div>
  );
};

export default JobAlertToggle;
