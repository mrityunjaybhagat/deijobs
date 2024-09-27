import React from "react";
import Slider from "react-slick";

const TrustedPartners = () =>{
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow:5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
      {
        breakpoint:767,
        settings: {
          slidesToShow:3,
          slidesToScroll:1,
          initialSlide:0,
          arrows:0,
        }
      },
    ]
      };
    return(
    <>    
    <section className="partners p-6 text-center  bg-slate-50">
        <div className="container">
            <h2 className="text-xl text-center text-slate-700">OUR TRUSTED PARTNERS</h2>
            <Slider {...settings}>
              <div className="">
                <img src="assets/images/tataSteel.svg" className="" alt="Tata Steel"/>
              </div>
              <div className="">
                <img src="assets/images/maxLifeInsurance.svg" className="" alt="Max Life Insurance"/>
              </div>
              <div className="">
                <img src="assets/images/tataDigital.svg" className="" alt="Tata Digital"/>
              </div>        
            </Slider>
        </div>
    </section>
    </>
    )

}
export default TrustedPartners;