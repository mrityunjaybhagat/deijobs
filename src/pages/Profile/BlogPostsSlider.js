import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomSlider from "../../components/ui/CustomSlider";
const BlogPostsSlider = ({
  categorySlug = "career-advice",
  tagID = 551,
  postType = "resources",
  limit = 3,
  title = "Career Advice"
}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategoryId = async (slug) => {
    try {
      const res = await axios.get(
        `https://deijobs.in/blog/wp-json/wp/v2/resource_category?slug=${slug}`
      );
      return res.data[0]?.id;
    } catch (error) {
      console.error("Error fetching category ID", error);
      return null;
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    const categoryId = await getCategoryId(categorySlug);
    if (!categoryId) return;

    try {
      const response = await axios.get(
        `https://deijobs.in/blog/wp-json/wp/v2/${postType}`,
        {
          params: {
            resource_category: categoryId,
            tags: tagID,
            per_page: limit,
            _embed: true,
          },
        }
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [categorySlug, tagID, postType, limit]);

  const stripHTML = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const truncate = (text, maxWords = 60) => {
    const words = text.trim().split(" ");
    return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : text;
  };

  if (loading) return <p>Loading posts...</p>;

if (!loading && posts.length === 0) {
  return <h6>No posts available.</h6>;
}

return (
  <div className="blog-row">
    <CustomSlider
      customSettings={{
        slidesToShow: 1,
        arrows: true,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: true,
            },
          },
        ],
      }}
    >
      {posts.map((post, index) => {
        const featuredImage =
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "https://deijobs.in/blog/wp-content/uploads/2025/07/No-Image-Placeholder.png";

        const rawExcerpt = post.excerpt?.rendered || post.content?.rendered || "";
        const textExcerpt = truncate(stripHTML(rawExcerpt), 30) + "";

        return (
          <div key={post.id} className="card w-1">
            <div className="card-image-wrapper card-image-short">
              <img
                src={featuredImage}
                alt={post.title?.rendered || "Blog Post"}
              />
            </div>
            <div className="card-body">
              <div
                className="card-title"
                dangerouslySetInnerHTML={{
                  __html: post.title?.rendered || "Untitled",
                }}
              />
              <div className="card-text">{textExcerpt}</div>
              <a className="read-more" href="">
                Read More
              </a>
            </div>
          </div>
        );
      })}
    </CustomSlider>
  </div>
);

};

export default BlogPostsSlider;
