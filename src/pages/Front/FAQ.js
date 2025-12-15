import React,{useState} from 'react';
import { useResponsive } from '../../config/responsive';
import BackButton from '../../components/ui/BackButton';
const FAQ = () =>{
	const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();
    const [openQuestions, setOpenQuestions] = useState([]);

  const toggleQuestion = (index) => {
    if (openQuestions.includes(index)) {
      setOpenQuestions(openQuestions.filter((item) => item !== index));
    } else {
      setOpenQuestions([...openQuestions, index]);
    }
  };

  const faqData = [
    {
      question: "What is DEI Jobs?",
      answer:
        "DEI Jobs is a specialized job portal dedicated to promoting diversity, equity, and inclusivity in the Indian job market. We connect inclusive candidates with employers committed to fostering diverse and inclusive workplaces.",
    },
    {
      question: "How can I create a profile on DEI Jobs?",
      answer:
        "To create a profile on DEI Jobs, simply sign up with your email address, fill in your details, and upload your resume. You can then start exploring and applying for job opportunities that align with your values.",
    },
    {
      question: "What types of job listings can I find on DEI Jobs?",
      answer:
        "DEI Jobs offers a wide range of job listings, including full-time, part-time, freelance, and internship opportunities. You can find positions across various industries and sectors that prioritize diversity and inclusivity.",
    },
    {
      question:
        "Can I search for jobs based on specific diversity and inclusion criteria?",
      answer:
        "Yes, DEI Jobs provides search filters that allow you to refine your job search based on specific diversity and inclusion criteria, ensuring you find roles that match your values and preferences.",
    },
    {
      question: "How does DEI Jobs support my job search?",
      answer:
        "DEI Jobs provides resources and tools to enhance your job search, including expert advice, job matching, and networking opportunities. We're here to help you find inclusive workplaces where you can thrive.",
    },
    {
      question: "Is DEI Jobs only for certain industries or professions?",
      answer:
        "No, DEI Jobs welcomes candidates from all industries and professions. We aim to support diversity and inclusivity across the entire job market.",
    },
    {
      question:
        "How can I stay informed about the latest job openings on DEI Jobs?",
      answer:
        "You can read our blogs and follow us on social media to stay updated on the latest job openings, career advice, and diversity and inclusion trends.",
    },
    {
      question: "Is there a fee for using DEI Jobs as a job seeker?",
      answer:
        "DEI Jobs offers free registration and access to job listings for job seekers. There are no hidden charges for candidates.",
    },
    {
      question: "What makes DEI Jobs stand out among job portals in India?",
      answer:
        "DEI Jobs is unique for its exclusive focus on promoting diversity, equity, and inclusivity. We are dedicated to connecting inclusive candidates with employers who share the same commitment to these values.",
    },
    {
      question: "How does DEI Jobs help me get my ideal job?",
      answer:
        "At DEI Jobs, we empower you to define your ideal job. You can articulate your dream job description, and our highly intelligent recommendation engine goes to work, showcasing your vision to individuals who might be able to assist you, even if you don't know them personally. This way, you're never alone in your job search journey, as our platform leverages the power of networking and collective expertise.",
    },
    {
      question: "How is my job search better on DEI?",
      answer: (
        <div>
          <p>
            Your job search experience is enhanced on DEI Jobs through a range
            of invaluable features:
          </p>
          <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
            <li>
              Intelligent Search Engine: Our search engine, meticulously crafted
              by industry experts, offers a competitive edge by delivering job
              listings that closely align with your search criteria.
            </li>
            <li>
              Save Job Criteria: You can save your desired search criteria,
              allowing our recommendation engine to deliver job openings that
              meet your preferences directly to your inbox. This ensures you
              won't miss relevant opportunities.
            </li>
            <li>
              Network with Potential Allies: You can present your dream or ideal
              job, and our highly intelligent recommendation engine shares it
              with potential helpers in your network, even those you might not
              know personally. This fosters a supportive community in your job
              search.
            </li>
            <li>
              Connect with Employees: DEI Jobs allows you to network with
              current employees and alumni of prospective employers, providing
              valuable insights to make informed decisions about your next job.
            </li>
            <li>
              Detailed Company Profiles: Explore comprehensive company profiles
              to access in-depth information about prospective employers,
              including their general profile, company details, and more. This
              wealth of data empowers you to make a well-informed decision about
              your future employer.
            </li>
          </ul>
        </div>
      ),
    },
    {
      question:
        "Does my resume get screened before sending it to a prospective employer?",
      answer:
        "No, at DEI Jobs, we do not screen your resume. When you apply for a job, your application is sent directly to the employer without any screening from our side. We believe in providing a direct and unfiltered connection between job seekers and potential employers.",
    },
    {
      question: "Who all have access to my Resume?",
      answer:
        "Only corporate entities seeking to hire talent have access to your resume or curriculum vitae. Your information is shared exclusively with those looking to make recruitment decisions, ensuring your privacy and data security.",
    },
    {
      question: "Is there any limit to the number of jobs that I can apply to?",
      answer:
        "To prevent spamming and misuse, it is recommended to not apply to more than 25 job applications. We believe that this limit is adequate for responsible job seekers who apply with care and discretion.",
    },
    {
      question:
        "I have applied to a job posting that suited my profile but have not received a response for over a month. What should I do?",
      answer:
        "If you haven't received a response to your job application after a month, there could be various reasons that are known to the employer. However, you can save your job criteria so you can receive future job listings that match your preferences directly, increasing your chances of finding the right opportunity.",
    },
  ];
	return(
        <>
        <section className="main_container main_container_new">
		    <div className="container">
			{isDesktopOrLaptop && (
				<BackButton/>
			)}
				<div className="card big_card">
			        <h1 className="txt-primary fs-4">FAQ</h1>
					{faqData.map((item, index) => (
          <div key={index} className="mb-3">
            <div
              className="cursor-pointer d-flex align-items-center"
              onClick={() => toggleQuestion(index)}
            >
              <span className="me-2">{openQuestions.includes(index) ? "▼" : "►"}</span>
              <span className="fw-bold">{item.question}</span>
            </div>
            {openQuestions.includes(index) && (
              <div className="mt-2 text-secondary">
                {item.answer}
              </div>
            )}
          </div>
        ))}
		        </div>		
		    </div>
	    </section>

        </>
    )
}

export default FAQ;