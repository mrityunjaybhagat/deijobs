import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AnalyticsTracker from './utils/AnalyticsTracker.js';
import PrivateRoute from './utils/PrivateRoute';
import HomePage from './pages/Front/Home';
import LoginPage from './pages/Front/Login';
import VerifyOtp from './pages/Front/OtpVerification';
import SearchJobs from './pages/Front/SearchJobs.js';
import PrivacyPage from './pages/Front/privacy.js';
import TermsPage from './pages/Front/terms.js';
import TermsConditionPage from './pages/Front/termscondition.js';
import NotFound from './pages/Front/NotFound';
import Jobs from './pages/Profile/Jobs';
import UploadResume from './pages/Profile/UploadResume';
import CreateProfile from './pages/Profile/CreateProfile.js';
import AccountPage from './pages/Profile/AccountPage.js';
import NotificationPage from './pages/Profile/Notification.js';
import SavedJobs from './pages/Profile/SavedJobs.js';
//import JobApplied from './pages/Profile/JobApplied.js';
//import RecentJobs from './pages/Profile/RecentJobs.js';
import JobDetailPage from './pages/Profile/JobDetail.js';
import Header from './components/includes/Header.js';
import Footer from './components/includes/Footer.js';
import FeaturedJobsPage from './pages/Front/FeaturedJobsPage.js';
import SearchResults from './pages/Front/SearchResults.js';
import CompanyData from './pages/Profile/CompanyData.js';
import More from './pages/Profile/More.js';
import ProfileOverview from './pages/Profile/ProfileOverview.js';
import ProfileAdd from './pages/Profile/ProfileAdd.js';
import ProfilePreferences from './pages/Profile/ProfilePreferences.js';
import FAQ from './pages/Front/FAQ.js';
import VerifyMailOtp from './pages/Profile/OtpMailVerification.js';
import Blogs from './pages/Front/Blogs.js';
import FutureOfDeiJobsPage from './pages/Front/FutureOfDeiJobsPage.js';
import Resources from './pages/Profile/Resources.js';
import CandidateBlog from './pages/Profile/Blog.js';
import MetaPixelTracker from './utils/MetaPixelTracker.js';
import AppliedJobs from './pages/Profile/AppliedJobs.js';
import RecentsJobs from './pages/Profile/RecentsJobs.js';
import CompanyJobs from './pages/Profile/CompanyJobs.js';
import JobsTypePage from './pages/Profile/JobsType.js';
import RecommendedJobs from './pages/Profile/RecommendedJobs.js';
import Receipt from './Receipt.js';
import CompanyTypesJobs from './pages/Profile/CompanyTypesJobs.js';
import JobsBySkill from './pages/Profile/JobsBySkill.js';
import FeaturedJobs from './pages/Profile/FeaturedJobs.js';
function App() {
  const isLoggedIn = localStorage.getItem('login_token');
  return (
    <div className="App">
    <Header/>
        <AnalyticsTracker />
        <MetaPixelTracker />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path='/login' element={isLoggedIn ? <Navigate to="/jobs" /> :<LoginPage/>} />
        <Route path="/verify-mobile" element={<VerifyOtp/>} />
        <Route path="/search-jobs" element={<SearchJobs/>} />
        <Route path='/privacy_policy' element={<PrivacyPage/>} />
        <Route path='/termsofuse' element={<TermsPage/>} />
        <Route path='/future_of_deijobs' element={<FutureOfDeiJobsPage/>} />
        <Route path='/t&c' element={<TermsConditionPage/>} />
        <Route path='/showAll/featured-jobs' element={<FeaturedJobsPage/>} />
        <Route path="/faq" element={<FAQ/>} />
        <Route path='/search-results' element={<SearchResults/>} />
        <Route path="*" element={<NotFound/>} />


        <Route path="/upload-resume" element={<PrivateRoute><UploadResume/></PrivateRoute>}/>
        <Route path='/create-profile' element={<PrivateRoute><CreateProfile/></PrivateRoute>} />
        <Route path='/notifications' element={<PrivateRoute><NotificationPage/></PrivateRoute>} />
        <Route path='/verification/email' element={<PrivateRoute><VerifyMailOtp/></PrivateRoute>} />
        <Route path="/account" element={<PrivateRoute><AccountPage/></PrivateRoute>}/>
        <Route path="/profile/overview" element={<PrivateRoute><ProfileOverview/></PrivateRoute>} />
        <Route path="/profile/add" element={<PrivateRoute><ProfileAdd/></PrivateRoute>} />
        <Route path="/profile/preferences" element={<PrivateRoute><ProfilePreferences/></PrivateRoute>} />
        <Route path='/receipt' element={<PrivateRoute><Receipt/></PrivateRoute>} />
        <Route path="/resources" element={<PrivateRoute><Resources/></PrivateRoute>} />
        <Route path="/profile/blog" element={<PrivateRoute><CandidateBlog/></PrivateRoute>} />
        <Route path='/more' element={<PrivateRoute><More/></PrivateRoute>} />
        {/* <Route path="/profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>} /> */}
        
        
        <Route path="/jobs" element={<PrivateRoute><Jobs/></PrivateRoute>}/>
        <Route path='/job/:jobId' element={<JobDetailPage/>} />
        <Route path='/jobs/:type' element={<PrivateRoute><JobsTypePage/></PrivateRoute>}/>
        <Route path='/jobs/company-type/:type' element={<PrivateRoute><CompanyTypesJobs/></PrivateRoute>}/>
        <Route path='/jobs/skill/:type' element={<PrivateRoute><JobsBySkill/></PrivateRoute>}/>
        <Route path='/jobs/featured' element={<PrivateRoute><FeaturedJobs/></PrivateRoute>}/>
      
        <Route path='/jobs/saved' element={<PrivateRoute><SavedJobs/></PrivateRoute>}/>
        <Route path='/jobs/applied' element={<PrivateRoute><AppliedJobs/></PrivateRoute>}/>
        <Route path='/jobs/recent' element={<PrivateRoute><RecentsJobs/></PrivateRoute>} />
        <Route path='/jobs/recommended' element={<PrivateRoute><RecommendedJobs/></PrivateRoute>}/>
        <Route path='/jobs/company/:id' element={<PrivateRoute><CompanyJobs/></PrivateRoute>}/>
        

        {/* <Route path='/showAll/saved-jobs' element={<PrivateRoute><SavedJobs/></PrivateRoute>} />
        <Route path='/showAll/applied-jobs' element={<PrivateRoute><JobApplied/></PrivateRoute>} />        
        <Route path='/showAll/recent-jobs' element={<PrivateRoute><RecentJobs/></PrivateRoute>} />
        <Route path='/showAll/top-companies/:id' element={<PrivateRoute><CompanyData/></PrivateRoute>} /> */}
        

        
        {/* <Route path='/JobsTable' element={<JobsTable/>}/> */}
      </Routes>
      <Footer/>
    </div>
  );
}
export default App;
