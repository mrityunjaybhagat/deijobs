import { useState,useEffect } from "react";
import { postData } from "../../services/apiAxios";

const ProfilePage = () => {
    const [activeTab,setActiveTab] =  useState("overview");
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);
    const userId = localStorage.getItem('login_token');

    useEffect(() => {
        const fetchProfileData = async () => {
            try{
                const res = await postData("get-profile-data",{userId});
                if (res.code === 200) {
                const user = res.data.user_data?.[0] || {};
                setProfileData({ user });
                } else {
                  setError(res.message || "Something went wrong");
                  //console.error("❌ Error:", res.message || "Something went wrong");
                }
            }
            catch (err) {
                console.error("💥 Network or server error:", err);
            }
            finally{
                setLoading(false);
            }
        };
        fetchProfileData();
    }, []);
    return (
    <>
    <section className='content'>
      <div className='container'>
        <div className='row'>
            <div className="col-md-3">Left Sidebar</div>
            <div className="col-md-6">
                 {/* Tab Navigation */}
                <div className="card">
                <ul className="nav nav-tabs nav-items">
                    <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
                        onClick={() => setActiveTab("overview")}
                    >
                        Overview
                    </button>
                    </li>
                    <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
                        onClick={() => setActiveTab("profile")}
                    >
                        Profile
                    </button>
                    </li>
                    <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "preferences" ? "active" : ""}`}
                        onClick={() => setActiveTab("preferences")}
                    >
                        Preferences
                    </button>
                    </li>
                </ul>
                </div>

                {/* Tab Content */}
                <div className="card no-border shadow">
                    <div className="tab-content">
                        {activeTab === "overview" && (
                        <div className="card-body profile_overview" style={{ background: '#F3F4F6' }}>
                            {activeTab === "overview" && profileData && (
                                <p>Name: {profileData.user?.name}</p>    
                            )}
                            <h4>Overview</h4>
                            <p>This is the overview section content.</p>
                        </div>
                        )}
                        {activeTab === "profile" && (
                        <div>
                            <h4>Profile</h4>
                            <p>Here you can manage your profile information.</p>
                        </div>
                        )}
                        {activeTab === "preferences" && (
                        <div>
                            <h4>Preferences</h4>
                            <p>Update your app preferences here.</p>
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="col-md-3">Right Sidebar</div>
        </div>
      </div>
    </section>
    </>
    )
};
export default ProfilePage;