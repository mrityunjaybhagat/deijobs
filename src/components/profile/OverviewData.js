import React, { useState, useEffect } from 'react';
import icons from "../../assets/icons";
import { getOverviewData } from '../../services/profileServices';
import OverviewCard from './OverviewCard';


const OverviewData = () => {
  const [overviewData, setOverviewData] = useState(null);
  const [saveJobCount, setSaveJobCount] = useState(0);
  const [appliedJobCount, setAppliedJobCount] = useState(0);
  const [shareJobCount, setShareJobCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = localStorage.getItem("login_token");


  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const data = await getOverviewData(userId);
        setOverviewData(data);
        if(data.jobActionCount){
          setSaveJobCount(data.jobActionCount.saveJobCount || 0);
          setAppliedJobCount(data.jobActionCount.appliedJobCount || 0);
          setShareJobCount(data.jobActionCount.shareJobCount || 0);
        }
      } catch (error) {
        setError("Failed to fetch overview data");
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <OverviewCard count={saveJobCount} text='Saved Jobs' iconSrc={icons['bookmark.svg']}   goTo='/jobs/saved' />
    <OverviewCard count={appliedJobCount} text='Applied Jobs' iconSrc={icons['briefcase_blue.svg']}   goTo='/jobs/applied'/>
    {/* <OverviewCard count={shareJobCount} text='Shared Jobs' iconSrc={icons['briefcase_blue.svg']}/> */}
    </>
  );
};

export default OverviewData;
