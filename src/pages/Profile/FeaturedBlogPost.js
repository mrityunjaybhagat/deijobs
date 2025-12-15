import React, { useEffect, useState } from "react";
import axios from "axios";


const FeaturedBlogPost = ({
  categorySlug = "career-advice",
  tagID = 551,
  postType = "resources",
  limit = 4,
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
  if (!loading && posts.length === 0) return <p>No posts available.</p>;

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="blog-layout">
      {featuredPost && (
        <div className="featured-card card">
          <img
            src={
              featuredPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "https://deijobs.in/blog/wp-content/uploads/2025/07/No-Image-Placeholder.png"
            }
            alt={featuredPost.title?.rendered || "Blog Post"}
          />
          <div className="featured-content">
            <h2 dangerouslySetInnerHTML={{ __html: featuredPost.title?.rendered }} />
            <p>
              {truncate(
                stripHTML(featuredPost.excerpt?.rendered || featuredPost.content?.rendered || ""),
                40
              )}
            </p>
          </div>
        </div>
      )}

      <div className="right-posts">
        {otherPosts.map((post) => (
          <div key={post.id} className="small-card card">
            <img
              src={
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                "https://deijobs.in/blog/wp-content/uploads/2025/07/No-Image-Placeholder.png"
              }
              alt={post.title?.rendered || "Blog Post"}
            />
            <div className="small-card-content">
              <h3 dangerouslySetInnerHTML={{ __html: post.title?.rendered }} />
              <p>{truncate(stripHTML(post.excerpt?.rendered || post.content?.rendered || ""), 20)}</p>
              <a className="read-more" href={post.link} target="_blank" rel="noreferrer">Read More</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBlogPost;
