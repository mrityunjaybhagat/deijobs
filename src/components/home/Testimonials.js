import Slider from "react-slick";
import React, { useEffect, useState } from 'react';
import TestimonialCard from "../../components/ui/TestimonialCard";
import CustomSlider from "../ui/CustomSlider";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const removeHtmlTags = (html) => {
    return html.replace(/<[^>]*>?/gm, '');  // Regular expression to remove HTML tags
  };
  
  useEffect(() => {
    fetch('https://deijobs.in/deijobs-api/api/get-testimonials')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Debugging log
        if (data.code === 200 && data.testimonialsList) {
          setTestimonials(data.testimonialsList);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching testimonials:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading testimonials...</p>;
  }
  return (
    <>
      <CustomSlider customSettings={{slidesToShow:2.9,arrows:true,
      responsive: [
      {
        breakpoint:767,
        settings: {
          slidesToShow:1.1,
          slidesToScroll:1,
          arrows:false,
        }
      },
    ]
      }}>
        {testimonials.length > 0 ? (
          testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}  // Always add a key when mapping
              image={testimonial.image}
              title={testimonial.title}
              created_at={testimonial.created_at}
              description={removeHtmlTags(testimonial.description)}
              preference_category={testimonial.preference_category}
            />
          ))
        ) : (
          <p>No testimonials available.</p>
        )}
      </CustomSlider>
    </>
  );
};
export default Testimonials;
