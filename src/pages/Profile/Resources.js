import React, { useState, useEffect } from "react";
import { useResponsive } from '../../config/responsive';
import images from "../../assets/images";
import BottomNav from "../../components/ui/BottomNav";
import PayNowCard from "../../components/profile/PayNowCard";
import { useLocation } from 'react-router-dom';
import IconListItem from "../../components/profile/IconListItem";
import { Briefcase, ClipboardCheckIcon, Download, NotebookPen, User } from "lucide-react";
import ProfileCard from "../../components/profile/ProfileCard";

const Resources = () => {
  const location = useLocation();
  const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();
  return (
    <>
      <section className="content">
        <div className="container">
          <div className="row">
          {isDesktopOrLaptop && (
            <>
            <div className="col-md-12  col-sm-12">
              {/* <ProfileCard/> */}
              {/* <UserProfile/> */}
            </div>
            </>
          )}
            <div className="col-md-12 col-sm-12">
            {/* Pay Now Banner */}
            {isDesktopOrLaptop && (
              <>
            <div className="card no-pad shadow">
              <PayNowCard
                    type=""
                    BgImge={images["payment_banner.png"]}
                  />
              </div>
              </>
            )}
            {/* <ul className="nav-items">
              <li className={location.pathname === "/Jobs" ? "active" : ""}>
                <IconListItem iconCode={<Briefcase/>} iconText='Jobs' linkTo='/jobs' />
                </li>
              <li className={location.pathname === "/profile/add" ? "active" : ""}>
                <IconListItem iconCode={<User/>} iconText='Profile' linkTo='/profile/add' />
              </li>
              <li className={location.pathname === "/Jobs" ? "active" : ""}>
                <IconListItem iconCode={<ClipboardCheckIcon/>} iconText='Resources' linkTo='/resources' />
              </li>
              <li><IconListItem iconCode={<NotebookPen/>} iconText='Blog' linkTo='/resources' /></li>
            </ul> */}
              {/* Understanding Dei */}
              <div className="card no-border shadow">                
                <div className="d-flex justify-between w-100 gap-2 contentpage p-4">

<div>
  <h2 className="text-center">Understanding DEI</h2>
<div className="">
  <div>
    <h4>What is DEI?</h4>
    <p>Diversity, Equity, and Inclusion (DEI) are more than just buzzwords—they form the essential foundation of a fair, supportive, and thriving workplace. Diversity means embracing a wide range of backgrounds, identities, and perspectives. Equity focuses on creating fair access, opportunities, and treatment for everyone, recognizing and addressing systemic barriers that impact marginalized groups. Inclusion is about fostering environments where everyone feels valued, respected, and empowered to contribute their unique talents. Understanding DEI concepts can help you identify workplaces that truly support you and advance your career with purpose and dignity.</p>
    <p><a href="https://deijobs.in/uploads/resources/What_is_DEI.pdf" className="btn btn-sm btn-primary"><Download/> Learn DEI Basics</a></p>
  </div>

  <div>
    <h4>The Language of Inclusion</h4>
    <p>Every movement has its language, and DEI is no exception. To confidently navigate conversations, interviews, and workplace culture, it’s important to learn the key terms and concepts. From “microaggressions” and “unconscious bias” to “allyship” and “intersectionality,” this glossary breaks down the words you’ll encounter and helps you speak the language of inclusion. Knowing these terms strengthens your ability to advocate for yourself, recognize inclusive practices, and connect with peers and employers who share your values.</p>
  </div>

  <div>
    <h4>Busting DEI Myths</h4>
    <p>DEI work can sometimes be misunderstood or met with skepticism due to common myths and misconceptions. Some believe DEI benefits only certain groups, or that it undermines merit-based hiring. Others think it’s just a trend or a checkbox exercise. This resource clears up those myths by sharing facts, evidence, and real-world examples that reveal why DEI is critical for everyone’s success—candidates, employers, and organizations alike. Armed with accurate information, you can approach your job search and workplace with confidence, knowing what true inclusion looks like.</p>
  </div>

  <div>
    <h4>Building Inclusive Resumes</h4>
    <p>Your resume is more than a list of skills—it’s your personal story and a reflection of your unique identity and values. Building an inclusive resume means highlighting your strengths and experiences in a way that feels authentic while maintaining professionalism. Learn how to showcase diverse experiences, use inclusive language, and emphasize transferable skills that align with companies committed to equity. This guide also helps you navigate common challenges, like addressing employment gaps or explaining accommodations, so you present your best self confidently.</p>
  </div>

  <div>
    <h4>How to Spot Inclusive Employers</h4>
    <p>Not all companies that claim to be inclusive truly walk the talk. This resource equips you with practical tools to identify red flags like lack of diversity statements, absence of employee resource groups, or unclear policies on accommodations. You’ll also learn green flags to look for—such as transparent DEI reporting, diverse leadership, and inclusive benefits—that signal genuine commitment. Plus, get a list of thoughtful questions to ask during interviews that help you assess whether the employer’s culture aligns with your values and needs.</p>
  </div>

  <div>
    <h4>Preparing for DEI-Focused Interviews</h4>
    <p>More employers are integrating DEI into their hiring conversations, asking candidates about their understanding of inclusion, experiences working in diverse teams, and approach to equity. This guide provides real examples of DEI-related interview questions and thoughtful ways to answer them, helping you articulate your experiences and perspectives with confidence. From discussing challenges you’ve faced to highlighting how you contribute to inclusive environments, you’ll be prepared to leave a strong, authentic impression.</p>
    <p><a href="https://deijobs.in/uploads/resources/Job_Application_Inclusion_Checklist.pdf" className="btn btn-sm btn-primary"><Download/> Inclusion Checklist</a></p>
  </div>
</div>
<div>
  <h3>Community & Stories</h3>

  <div>
    <h4>Real Voices, Real Journeys</h4>
    <p>Everyone’s path is unique, especially when navigating challenges related to identity and inclusion at work. In this section, you’ll find powerful stories and testimonials from diverse professionals who have faced bias, broken barriers, and carved out successful, fulfilling careers. These authentic experiences offer inspiration, guidance, and practical advice to help you understand what’s possible—and remind you that you’re not alone on your journey.</p>
    <p><a href="https://deijobs.in/uploads/resources/Real_Voices_Real_Journeys.pdf" className="btn btn-sm btn-primary"><Download/> Real Voices, Real Journeys</a></p>
  </div>
</div>
<div>
  <h3>Data That Empowers</h3>

  <div>
    <h4>DEI Stats You Should Know</h4>
    <p>Knowledge is power — especially when it comes to understanding workplace inclusion. This resource compiles over 100 key statistics and facts about diversity, equity, and inclusion that reveal the current landscape of hiring, representation, pay equity, and workplace culture. From gender gaps and disability inclusion to LGBTQ+ representation and retention trends, these insights help you stay informed, advocate for yourself, and make strategic career decisions based on data-backed realities.</p>
    <p><a href="https://deijobs.in/uploads/resources/India-Specific_DEI_Landscape.pdf" className="btn btn-sm btn-primary"><Download/>  India-Specific DEI Landscape</a></p>
  </div>

  <div>
    <h4>Gender Pay Gaps & Representation Reports</h4>
    <p>Pay equity remains one of the biggest challenges in building truly inclusive workplaces. This section breaks down gender pay gaps across various industries—IT, finance, healthcare, manufacturing, and more—highlighting where disparities are largest and where progress is being made. By understanding these numbers, you can better assess your worth, negotiate salaries with confidence, and identify sectors leading the way in fair compensation. Diversity is not just about numbers—it’s about who’s present at every level of an organization. Explore detailed reports on representation across gender, caste, disability, and sexual orientation in leadership roles, mid-management, and entry-level jobs. These reports shed light on which groups are underrepresented or missing entirely, helping you recognize systemic gaps and supporting your search for employers committed to inclusive representation.</p>
    <p><a href="https://deijobs.in/uploads/resources/Industry_Breakdown.pdf" className="btn btn-sm btn-primary"><Download/>  Industry Breakdown</a></p>
  </div>
</div>
</div>








                </div>
              </div>
            </div>            
          </div>
        </div>
      </section>
      {isTabletOrMobile && (
        <>
        <BottomNav/>
        </>
      )}
    </>
  );    
};

export default Resources;
