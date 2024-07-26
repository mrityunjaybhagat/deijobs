import React from "react";
import Slider from "react-slick";
import JobCard from '../component/JobCard';

const FeturedJob = () =>{
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow:5,
        slidesToScroll: 1
      };
    return(
        <>
            <section className="featured py-6 bg-slate-50">
                <div className="container">
                    <h2 className=" text-2xl text-center">Featured companies actively hiring</h2>
                    <Slider {...settings}>
                       <JobCard/>
                       <JobCard/>
                       <JobCard/>
                       <JobCard/>
                       <JobCard/>
                    </Slider>
                </div>
            </section>
        </>
    );
};
export default FeturedJob;