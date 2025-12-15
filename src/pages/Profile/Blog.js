import { useResponsive } from "../../config/responsive";
import images from "../../assets/images";
import banner_image from "../../assets/images/blog_banner_images.png";
import img1 from "../../assets/images/img1.png";
import BottomNav from "../../components/ui/BottomNav";
import PayNowCard from "../../components/profile/PayNowCard";
import { useLocation } from "react-router-dom";
import BlogPosts from "./BlogPosts";
import FeaturedBlogPost from "./FeaturedBlogPost";
import BlogPostsSlider from "./BlogPostsSlider";
import icons from '../../assets/icons';

const CandidateBlog = () => {
  const location = useLocation();
  const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();
  return (
    <>
      <section className="content p-0">
        <div className="banner blog_banner" style={{ background: "f3f3f3" }}>
          <div className="container">
            <div className="banner_txt">
              <div className="col-md-12 col-sm-12">
                <h2>
                  Empowering Inclusive Hiring<span>One Insight at a Time</span>
                </h2>
                <p>
                  Explore thought leadership, DEI recruitment trends, compliance
                  tips, and success strategies.
                </p>
              </div>
              {/* <div className="col-md-4 col-sm-12">
                    <img src={banner_image} at=""/>
                </div> */}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              {isDesktopOrLaptop ? (
                <>
                  <ul className="nav-items_ blog_menu d-flex">
                    <li>
                      <a href="https://deijobs.in/blog/resource-category/career-advice/">
                        Career Advice
                      </a>
                    </li>
                    <li>
                      <a href="https://deijobs.in/blog/resource-category/growth-learning/">
                        Growth & Learning
                      </a>
                    </li>
                    <li>
                      <a href="https://deijobs.in/blog/resource-category/hr-policies/">
                        HR Policies
                      </a>
                    </li>
                    <li>
                      <a href="https://deijobs.in/blog/resource-category/job-search/">
                        Job Search
                      </a>
                    </li>
                    <li>
                      <a href="https://deijobs.in/blog/resource-category/workplace-prep/">
                        Workplace Prep
                      </a>
                    </li>
                    <li>
                      <a href="https://deijobs.in/blog/resource-category/support-network/">
                        Support Network
                      </a>
                    </li>
                  </ul>
                </>
              ):(
                <button className="btn btn-sm">
                  See All <img src={icons['menu.svg']} alt="Menu Icon" />
                </button>
              )}

              {/* Pay Now Banner */}
              {/* Blog Post*/}
              <div className="blog_section card_ no-border shadow_">
                <div className="card-head">
                  <h3 className="card-title_">Featured</h3>
                  <a href="https://deijobs.in/blog/resource-category/jobseeker/">
                    See All
                  </a>
                </div>
                 {isDesktopOrLaptop ? (
                    <>
                    <FeaturedBlogPost 
                    categorySlug="jobseeker"
                  tagID={549}
                  postType="resources"
                  limit={3}
                  title="Jobseeker Resources"
                />
                </>
                 ):(
                  <>
                  <BlogPostsSlider 
                    categorySlug="jobseeker"
                  tagID={549}
                  postType="resources"
                  limit={3}
                  title="Jobseeker Resources"/>
                  </>
                 )}
                
                 

                {/* <BlogPosts 
                categorySlug="jobseeker"
                tagID={549}
                postType="resources"
                limit={3}
                title="Jobseeker Resources"
              />              */}
              </div>
              {isDesktopOrLaptop && (
                <>
                  <div className="blog_paynow card no-pad shadow">
                    <PayNowCard type="" BgImge={images["payment_banner.png"]} />
                  </div>
                </>
              )}
              {/* Career Advice */}
              <div className="blog_section card_ no-border shadow_">
                <div className="card-head">
                  <h3 className="card-title_">Career Advice</h3>
                  <a href="https://deijobs.in/blog/resource-category/career-advice/">
                    See All
                  </a>
                </div>
                {isDesktopOrLaptop && (
                  <>
                    <BlogPosts
                      categorySlug="career-advice"
                      tagID={551}
                      postType="resources"
                      limit={3}
                      title="Career Advice Resources"
                    />
                  </>
                )}

                {!isDesktopOrLaptop && (
                  <>
                    <FeaturedBlogPost
                      categorySlug="career-advice"
                      tagID={551}
                      postType="resources"
                      limit={3}
                      title="Career Advice Resources"
                    />
                  </>
                )}
              </div>
              {/*Growth & Learning*/}
              <div className="blog_section card_ no-border shadow_">
                <div className="card-head">
                  <h3 className="card-title_">Growth & Learning</h3>
                  <a href="https://deijobs.in/blog/resource-category/growth-learning/">
                    See All
                  </a>
                </div>
                {isDesktopOrLaptop && (
                  <>
                    <BlogPosts
                      categorySlug="growth-learning"
                      tagID={551}
                      postType="resources"
                      limit={6}
                      title="HR Policy Resources"
                    />
                  </>
                )}

                {!isDesktopOrLaptop && (
                  <>
                    <FeaturedBlogPost
                      categorySlug="growth-learning"
                      tagID={551}
                      postType="resources"
                      limit={6}
                      title="HR Policy Resources"
                    />
                  </>
                )}
              </div>
              {/* HR Policies*/}
              <div className="blog_section card_ no-border shadow_">
                <div className="card-head">
                  <h3 className="card-title_">HR Policies</h3>
                  <a href="https://deijobs.in/blog/resource-category/hr-policies/">
                    See All
                  </a>
                </div>
                {isDesktopOrLaptop && (
                  <>
                    <BlogPosts
                      categorySlug="hr-policies"
                      tagID={551}
                      postType="resources"
                      limit={3}
                      title="HR Policy Resources"
                    />
                  </>
                )}

                {!isDesktopOrLaptop && (
                  <>
                    <FeaturedBlogPost
                      categorySlug="hr-policies"
                      tagID={551}
                      postType="resources"
                      limit={1}
                      title="HR Policy Resources"
                    />
                  </>
                )}
              </div>

              <div className="card newsletter" style={{ background: "#000" }}>
                <div className="d-flex">
                  <div className="newsl_text">
                    <h2>Subscribe to Our Newsletter</h2>
                    <p>
                      For IDF Charter Members Driving Change Your exclusive DEI
                      update starts here.
                    </p>
                    <form className="newsletter_form">
                      <div className="">
                        <input type="text" className="form-control" />
                        <button className="btn btn-primary">Submit Now</button>
                      </div>
                    </form>
                  </div>
                  <div className="newl_img">
                    <img src={img1} alt="" />
                  </div>
                </div>
              </div>
              {/*Job Search*/}
              <div className="blog_section card_ no-border shadow_">
                <div className="card-head">
                  <h3 className="card-title_">Job Search</h3>
                  <a href="https://deijobs.in/blog/resource-category/hr-policies/">
                    See All
                  </a>
                </div>
                {isDesktopOrLaptop && (
                  <>
                    <BlogPosts
                      categorySlug="hr-policies"
                      tagID={558}
                      postType="resources"
                      limit={3}
                      title="Job Search"
                    />
                  </>
                )}

                {!isDesktopOrLaptop && (
                  <>
                    <FeaturedBlogPost
                      categorySlug="hr-policies"
                      tagID={558}
                      postType="resources"
                      limit={3}
                      title="Job Search"
                    />
                  </>
                )}
              </div>
              {/*Workplace Prep*/}
              <div className="blog_section card_ no-border shadow_">
                <div className="card-head">
                  <h3 className="card-title_">Workplace Prep</h3>
                  <a
                    className="btn btn-transparent"
                    href="https://deijobs.in/blog/resource-category/workplace-prep/"
                  >
                    See All
                  </a>
                </div>
                {isDesktopOrLaptop && (
                  <>
                    <BlogPosts
                      categorySlug="workplace-prep"
                      tagID={560}
                      postType="resources"
                      limit={3}
                      title="Workplace Prep"
                    />
                  </>
                )}

                {!isDesktopOrLaptop && (
                  <>
                    <FeaturedBlogPost
                      categorySlug="workplace-prep"
                      tagID={560}
                      postType="resources"
                      limit={3}
                      title="Workplace Prep"
                    />
                  </>
                )}
              </div>
              {/*Support Network*/}
              <div className="blog_section card_ no-border shadow_">
                <div className="card-head">
                  <h3 className="card-title_">Support Network</h3>
                  <a href="https://deijobs.in/blog/resource-category/hr-policies/">
                    See All
                  </a>
                </div>
                {isDesktopOrLaptop && (
                  <>
                    <BlogPosts
                      categorySlug="hr-policies"
                      tagID={551}
                      postType="resources"
                      limit={3}
                      title="HR Policy Resources"
                    />
                  </>
                )}

                {!isDesktopOrLaptop && (
                  <>
                    <FeaturedBlogPost
                      categorySlug="hr-policies"
                      tagID={551}
                      postType="resources"
                      limit={3}
                      title="HR Policy Resources"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {isTabletOrMobile && (
        <>
          <BottomNav />
        </>
      )}
    </>
  );
};

export default CandidateBlog;
