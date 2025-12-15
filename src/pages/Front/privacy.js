import { Link, useNavigate } from "react-router-dom";
import { useResponsive } from '../../config/responsive';
import BackButton from '../../components/ui/BackButton';
const PrivacyPage = () =>{
	const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();
	return(
        <>
        <section className="main_container main_container_new">
		    <div className="container">
			{isDesktopOrLaptop && (
				<BackButton/>
			)}
				<div className="card big_card textonly">
			        <h1 className="txt-primary fs-4">Privacy Policy</h1>
					<div>Introduction</div>
			        <div className="mt-5">
  <p>
    Welcome to <b>DEIJobs.in</b>, an initiative by the <b>India Diversity Forum</b>, a Section 8 company committed to eliminating workplace discrimination and fostering inclusive hiring practices.
  </p>
  <p>
    This Privacy Policy outlines how we collect, use, share, and protect your personal data when you access or use our platform, <b>www.deijobs.in</b>, whether as a candidate, employer, visitor, or partner. By using the platform, you agree to the terms set out in this policy and in our Terms of Use.
  </p>

  <h2>1. Introduction</h2>
  <p>
    At DEIJobs.in, we value your privacy and are committed to safeguarding it in every possible way. This Privacy Policy explains our current practices and policies regarding the collection and handling of personal data through our website and any direct interactions. We comply with applicable Indian data protection laws.
  </p>
  <p>
    www.deijobs.in serves as an inclusive employment marketplace, allowing job seekers to upload resumes, explore career opportunities, and connect with employers. Employers can post job openings, search for candidates, and use value-added services like multimedia uploads, alumni engagement tools, CSR showcases, and testimonials.
  </p>
  <p>
    This policy applies to all users of the platform—whether registered or visiting—and governs all data interactions through the site.
  </p>

  <h2>2. Types of Information We Collect</h2>
  <p>We collect a range of information to help us deliver and improve our services:</p>
  <p><b>a. Information You Provide Directly:</b></p>
  <ul>
    <li>Name, email address, contact number, company/organization</li>
    <li>Resume details (experience, education, location, salary history)</li>
    <li>Gender, caste, or affirmative action status (optional)</li>
    <li>Communication records through the platform</li>
    <li>Content you upload (e.g., testimonials, posts, opinions)</li>
  </ul>
  <p><b>b. Automatically Collected Information:</b></p>
  <ul>
    <li>IP address, browser type, operating system, device information</li>
    <li>Clickstream data, site usage patterns, location data</li>
    <li>Cookies and tracking technologies</li>
  </ul>
  <p><b>c. Social Media Sign-In:</b></p>
  <p>If you sign in via a social platform, we collect data per that platform’s privacy policy.</p>

  <h2>3. Use of Information</h2>
  <p>We use your data to:</p>
  <ul>
    <li>Facilitate your job search or recruitment activities</li>
    <li>Send relevant alerts and notifications</li>
    <li>Personalize your experience on the platform</li>
    <li>Improve our content, functionality, and service delivery</li>
    <li>Conduct market research and surveys</li>
    <li>Fulfil legal obligations, identity verification, or background screening</li>
    <li>Prevent fraud, misuse, or other violations of our Terms of Use</li>
  </ul>
  <p>You may customise the type of communications you receive. Certain administrative messages cannot be opted out of unless you deactivate your account.</p>

  <h2>4. Sharing of Information</h2>
  <p>We only share your personal information when necessary, and always with appropriate safeguards.</p>
  <p><b>a. With Your Consent:</b></p>
  <p>You may choose to share your information with third parties (e.g., companies, NGOs). These parties' data practices are governed by their own privacy policies.</p>
  <p><b>b. Legal Compliance:</b></p>
  <p>We may disclose data to comply with legal or regulatory obligations, including court orders or government requests.</p>
  <p><b>c. Change of Ownership:</b></p>
  <p>In the event of a merger, acquisition, or platform transition, your data may be transferred to the new entity.</p>

  <h2>5. Use of Cookies and Tracking Technologies</h2>
  <p>DEIJobs.in uses cookies, pixels, and other tracking tools to enhance user experience and analyze usage. These may store:</p>
  <ul>
    <li>Session information (to maintain logins)</li>
    <li>Preference data (to improve navigation)</li>
    <li>Anonymous data (for diagnostics and analytics)</li>
  </ul>
  <p>You can disable cookies via your browser settings, though some features may be impacted.</p>

  <h2>6. Data Access, Correction, and Deletion</h2>
  <p>You can:</p>
  <ul>
    <li>View and update your profile data</li>
    <li>Edit or delete specific information</li>
    <li>Remove your account entirely, upon request</li>
  </ul>
  <p>To make such requests, contact us at <a href="mailto:info@deijobs.in">info@deijobs.in</a>.</p>

  <h2>7. Protection of Minors</h2>
  <p>DEIJobs.in is not intended for users under 18 years of age. If you are under 18, please ask a parent or guardian to submit any necessary information on your behalf. We do not knowingly collect information from minors.</p>

  <h2>8. Information Security</h2>
  <p>We use industry-standard security protocols and store user information on secure servers protected by firewalls. However, no platform is immune to all risks. We advise users not to share sensitive information through unsecured channels like email or instant messaging.</p>
  <p>Please keep your login credentials confidential to prevent unauthorized access.</p>

  <h2>9. External Links</h2>
  <p>Our platform may contain links to third-party websites. We are not responsible for their content or privacy practices. We encourage you to read their respective privacy policies before interacting with them.</p>

  <h2>10. User-Generated Content</h2>
  <p>Any materials (e.g., opinions, videos, testimonials) you post may be visible to other users. Cached or archived versions of deleted materials may remain accessible. Please exercise discretion when sharing publicly.</p>

  <h2>11. Communications and Promotions</h2>
  <p>If you opt-in, we may:</p>
  <ul>
    <li>Send one-time emails to promote DEIJobs.in using your contacts</li>
    <li>Share platform updates, event invites, or relevant resources</li>
  </ul>
  <p>Recipients can request removal by writing to <a href="mailto:info@deijobs.in">info@deijobs.in</a>.</p>

  <h2>12. Updates to This Policy</h2>
  <p>We may revise this policy periodically. Non-material updates are effective upon posting; material updates will take effect 15 days after being posted. Continued use of the platform implies acceptance of the updated policy.</p>

  <h2>13. Contact Us</h2>
  <p>For questions, concerns, or data-related requests, please reach out:</p>
  <p><b>India Diversity Forum</b></p>
  <p>
    Address: 1st Floor, 91 SPRINGBOARD, 74 Techno Park, 74/II, Cross Rd C, Opp. Gate No. 2, SEEPZ, Andheri East, Mumbai, Maharashtra 400093
  </p>
  <p>Email: <a href="mailto:info@deijobs.in">info@deijobs.in</a></p>

  <p>Thank you for trusting DEIJobs.in. We are committed to protecting your data and supporting your journey toward inclusive careers and workplaces.</p>
</div>



					
		        </div>		
		    </div>
	    </section>

        </>
    )
}

export default PrivacyPage;