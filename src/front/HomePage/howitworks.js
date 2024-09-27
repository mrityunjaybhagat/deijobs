import React from "react";
import Slider from "react-slick";
const HowItWorks = () =>{
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow:4,
        slidesToScroll: 1,
        margin:10,
        arrows:1,
        responsive: [
        {
            breakpoint:767,
            settings: {
            slidesToShow:1.025,
            slidesToScroll:1.5,
            initialSlide:0,
            arrows:0,
            }
        },
    ]
      };
    return(
        <>
            <section className="howitowrks relative">
                <div className="container">
                    <div className="section_heading">
                        <h2 className="text-xl text-center text-slate-700">HOW IT WORKS</h2>
                        <h3 className="text-xl text-center text-slate-700">Catapult your career into D&I job opportunities</h3>
                    </div>
                    <div className="section_content">
                    <Slider {...settings}>
                            <div className="hiwbox">
                                <span className="sn text-white text-xl">1</span>
                                <div className="hiw text-right">
                                    <img src="/assets/images/howItWorkds01.png" alt=""/>
                                </div>
                                <p className="text-white">Create a DEI Jobs Account</p>
                            </div>
                            <div className="hiwbox">
                                 <span className="sn text-white text-xl">2</span>
                                 <div className="hiw text-center hiwcenter">
                                    <img src="/assets/images/howItWorkds02.png" alt=""/>
                                </div>
                                <p className="text-white">Host & Share your Resume</p>
                            </div>
                            <div className="hiwbox">
                                <span className="sn text-white text-xl">3</span>
                                <div className="hiw text-right">
                                    <img src="/assets/images/howItWorkds03.png" alt=""/>
                                </div>
                                <p className="text-white">Apply Easily to D&I Jobs and Sharing</p>
                            </div>
                    </Slider>
                    </div>
                    <div className="">
                        <div className="col-md-4  offset-md-4">
                            <a href="w-full " className="btn btn-trans signup bg-white py-2">Candidate Signup</a>
                        </div>
                    </div>
                </div>
               
            </section>
        </>
    )
}
export default HowItWorks;