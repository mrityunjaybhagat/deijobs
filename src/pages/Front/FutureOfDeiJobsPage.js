import { Link, useNavigate } from "react-router-dom";
import { useResponsive } from '../../config/responsive';
import BackButton from '../../components/ui/BackButton';

const FutureOfDeiJobsPage = () => {
    const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();
    const navigate = useNavigate();

    return (
        <>
            <section className="main_container main_container_new">
                <div className="container">
                    {isDesktopOrLaptop && (
                        <BackButton />
                    )}
                    <div className="card big_card">
                        <h1 className="txt-primary fs-4">The Future of DEI in India Inc. </h1>
                        <div className="mt-5">
                            <p>As India continues to emerge as a global economic powerhouse, the role of Diversity, Equity, and Inclusion (DEI) in shaping the future of work has become more critical than ever. DEI is no longer confined to the realms of policy compliance or HR initiatives — it is evolving into a strategic imperative that drives innovation, organizational resilience, and long-term growth.</p>
                            <p>India’s corporate landscape is unique, influenced by deep-rooted cultural, linguistic, regional, and caste-based dynamics. If DEI in India is to succeed, it must evolve beyond borrowed Western frameworks and reflect the country’s distinctive social structure and economic ambition.</p>
                            <p className="mt-2 mb-2"><strong>1. From Western Models to Indian Realities</strong></p>
                            <p>For years, DEI strategies in India mirrored Western approaches focused largely on gender, race, and disability inclusion. But India’s challenges and opportunities are different. The intersectionality of caste, region, language, religion, and economic class plays a significant role in workplace equity.</p>
                            <p>For instance, while gender diversity is a key focus, it is often skewed toward urban, English-speaking women in white-collar roles. Caste representation and regional diversity remain largely unaddressed in most corporate DEI programs.</p>
                            <ul>
                                <li>Acknowledge caste and socio-economic disparities in recruitment and leadership.</li>
                                <li>Create region-sensitive hiring and development pathways.</li>
                                <li>Support vernacular language inclusion in internal communication and learning platforms.</li>
                            </ul>
                            <p className="mt-2 mb-2"><strong>2. Remote Work: The New DEI Enabler</strong></p>
                            <p>The rise of remote and hybrid work models has opened up access to opportunities for individuals from Tier 2 and Tier 3 cities, as well as people with disabilities and caregivers. According to studies, nearly 74% of Indian employees report higher productivity while working remotely.</p>
                            <ul>
                                <li>Design hybrid policies that ensure equal access to leadership visibility and career advancement.</li>
                                <li>Train managers in inclusive communication and performance evaluation.</li>
                                <li>Promote location-agnostic opportunities across functions and levels.</li>
                            </ul>
                            <p className="mt-2 mb-2"><strong>3. Ethical Use of Technology</strong></p>
                            <p>AI and automation are transforming talent acquisition and performance management. But without oversight, these tools can amplify existing biases.</p>
                            <ul>
                                <li>Build ethical AI frameworks to audit and regulate recruitment algorithms.</li>
                                <li>Ensure human oversight in sensitive decisions.</li>
                                <li>Train recruiters and HR professionals in identifying and mitigating AI bias.</li>
                            </ul>
                            <p className="mt-2 mb-2"><strong>4. Embedding Psychological Safety & Well-Being</strong></p>
                            <p>DEI is not just about numbers — it’s about creating a workplace culture where everyone feels safe, seen, and heard. Psychological safety allows individuals to bring their whole selves to work, which in turn drives creativity and collaboration.</p>
                            <ul>
                                <li>Mental health support that is culturally contextual and confidential.</li>
                                <li>Safe spaces and inclusive language training for leaders and teams.</li>
                                <li>Recognition programs that reward empathy, inclusion, and allyship.</li>
                            </ul>
                            <p className="mt-2 mb-2"><strong>5. Making Inclusion Measurable</strong></p>
                            <p>Intent is important, but impact is everything. Despite the rise of DEI narratives, only 10% of employees in ‘inclusive’ companies feel truly valued. This points to the need for deeper accountability.</p>
                            <ul>
                                <li>Embedding DEI metrics into leadership KPIs and performance reviews.</li>
                                <li>Conducting regular inclusion pulse surveys and publishing findings.</li>
                                <li>Tracking diversity data across roles, levels, and locations.</li>
                            </ul>
                            <p className="mt-2 mb-2"><strong>6. Representation in Leadership</strong></p>
                            <p>Change begins at the top. Diverse and inclusive leadership fosters a culture of equity and sets the tone for the rest of the organization.</p>
                            <ul>
                                <li>Promote underrepresented leaders through mentorship and sponsorship programs.</li>
                                <li>Prioritize diversity in succession planning.</li>
                                <li>Encourage leaders to take public stands on inclusion and walk the talk.</li>
                            </ul>
                            <p>In India, this also includes recognizing and addressing caste-based inequities in leadership, particularly in industries like tech and consulting where homogeneity still dominates.</p>
                            <p className="mt-2 mb-2"><strong>7. Empowering ERGs & Communities</strong></p>
                            <p>Employee Resource Groups (ERGs) are powerful platforms for dialogue, support, and change. However, many ERGs in India remain underfunded or symbolic.</p>
                            <ul>
                                <li>Be given budgets, decision-making roles, and strategic influence.</li>
                                <li>Collaborate with external groups such as NGOs, universities, and local communities.</li>
                                <li>Be treated as business partners in shaping inclusive policies and practices.</li>
                            </ul>
                            <p className="mt-2 mb-2"><strong>8. Integrating DEI into ESG & Sustainability</strong></p>
                            <p>DEI is not separate from an organization’s environmental and social governance (ESG) goals—it is central to it.</p>
                            <ul>
                                <li>Align inclusive hiring with CSR and sustainability targets.</li>
                                <li>Use DEI data to improve supplier diversity and workforce equity.</li>
                                <li>Connect environmental action to equity in opportunity and education.</li>
                            </ul>
                            <p className="mt-2 mb-2"><strong>The Way Forward</strong></p>
                            <p>India’s demographic diversity offers a unique competitive advantage—but only if it is harnessed with intentionality and empathy. The future of DEI in India Inc. must be:</p>
                            <ul>
                                <li>Data-driven, to track progress and improve accountability.</li>
                                <li>Regionally grounded, reflecting India’s vast cultural and socio-economic landscape.</li>
                                <li>Leader-led, where the C-suite is visibly and vocally committed.</li>
                                <li>Systemically embedded, influencing every policy, process, and interaction.</li>
                            </ul>
                            <p>Organizations that embrace inclusive design, ethical tech, and culturally aware leadership will not only attract top talent but also build future-ready, purpose-led businesses.</p>
                            <p className="mt-2 mb-2"><strong>Final Thought</strong></p>
                            <p>DEI is no longer a nice-to-have — it is the foundation of modern, human-centered business. As we look ahead, India Inc. has the opportunity to reimagine DEI on its own terms — grounded in empathy, equity, and excellence.</p>
                            <p>Let’s move from performative allyship to transformative action, and together, shape a more inclusive India for the workforce of tomorrow.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FutureOfDeiJobsPage;
