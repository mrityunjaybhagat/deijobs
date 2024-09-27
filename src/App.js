import './App.css';
import { NavLink,Routes, Route, Link } from 'react-router-dom';
import HomePage from './front/Home';
import Login from './front/pages/login';
import PrivacyPage from './front/pages/privacy';
import TermsPage from './front/pages/terms';
import TermsConditionPage from './front/pages/termscondition';
import CreateProfile from './front/pages/create_profile';
import SearchResults from './front/pages/SearchResults';
import FeaturedJobsPage from './front/pages/FeaturedJobsPage';
import SearchJobs from './front/pages/SearchJobs';
import OTPVerification from './front/pages/otpVarification';
import Header from './front/includes/Header';
import Footer from './front/includes/Footer';
import UploadResume from './front/pages/upload_resume';
import EmailPhoneStatus from './front/pages/account';
import Jobs from './front/pages/jobs'
function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/login' element={<Login/>} />
      <Route path="/verify-mobile" element={<OTPVerification />} /> 
      <Route path='/privacy_policy' element={<PrivacyPage/>} />
      <Route path='/termsofuse' element={<TermsPage/>} />
      <Route path='/t&c' element={<TermsConditionPage/>} />
      <Route path="/upload-resume" element={<UploadResume/>}/>
      <Route path='/create-profile' element={<CreateProfile/>} />   
      <Route path='/search-results' element={<SearchResults/>} />
      <Route path='/showAll/featured-jobs' element={<FeaturedJobsPage/>}/>      
      <Route path='/search-jobs' element={<SearchJobs/>}/>      
      <Route path='/jobs' element={<Jobs/>}/>
      <Route path="/account" element={<EmailPhoneStatus/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}
export default App;
