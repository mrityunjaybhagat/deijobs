import Slider from "react-slick";
import React, { useEffect, useState } from 'react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

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
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:1.9,
    slidesToScroll: 3,
    arrows:1,
    responsive: [
      {
        breakpoint:767,
        settings: {
          slidesToShow:1.1,
          slidesToScroll:1,
          arrows:0,
        }
      },
    ]
  };
  return (
    <>
    <section className="newsletter bg-slate-50">
      <div className="container">
      <h2 className="text-xl text-center">NEWSLETTER</h2>
      <p className="text-lg">Join the community of job seekers and stay connected with a range of topics and aspects that revolve around D&I. Receive regular updates and learn how to navigate workplace dynamics</p>               
      <Slider {...settings}>
      {testimonials.length > 0 ? (
        testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white card shadow">
            <div className="testi_top d-flex">
                {testimonial.image && <img src={testimonial.image} alt={testimonial.title}  className="w-[34px] h-[34px] rounded-[150px] object-contain testi_img"/>}
                <div>
                <div className="w-40 h-4 text-gray-900 text-sm font-light leading-normal">{testimonial.title}</div>
                <div className=" h-4 text-gray-500 text-xs font-light leading-tight">{testimonial.created_at}</div>
                </div>
            </div>
            <div className="testi_bot">
              <h6 className="text-gray-900 text-sm">{testimonial.title}</h6>
              <div className="text-gray-400 text-xs font-light leading-tight overflow-hidden line-clamp-4 py-2">
                {testimonial.description}
              </div>
            </div>            
            <div className="testi_bottom">
            <p className="h-5  text-orange-600 text-sm font-medium leading-[14px]"> {testimonial.preference_category}</p>
            <p>Date: {testimonial.created_at}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No testimonials available.</p>
      )}
      </Slider>
      <div className='text-center'>
        <a href='/showAll/featured-jobs' className='btn btn-trans seeall'>View all companies</a>
      </div>
    </div>
    </section>
    <section className="bg-slate-50 py-[60px]">
      <div className="container">
        <h2 className="text-center primary_color">Subscribe to Newsletter</h2>
        <div className="col-md-4  offset-md-4">
            <input type="search" className="form-control mb-2" />
            <input type="submit" className="btn btn-primary text-white text-sm" value='Subscribe Now'/>
        </div>
      </div>
    </section>
    </>
  );
};
export default Testimonials;
