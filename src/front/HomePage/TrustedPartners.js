import React from "react";
import Slider from "react-slick";

const TrustedPartners = () =>{
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow:5,
        slidesToScroll: 1
      };
    return(
    <>    
    <section className="py-6 bg-slate-50 text-center">
        <div className="container">
            <h2 className="text-2xl">OUR TRUSTED PARTNERS</h2>
            <Slider {...settings}>
              <div className="">
                <img src="assets/images/tataSteel.svg" alt="Tata Steel"/>
              </div>
              <div className="">
                <img src="assets/images/maxLifeInsurance.svg" alt="Max Life Insurance"/>
              </div>
              <div className="">
                <img src="assets/images/tataDigital.svg" alt="Tata Digital"/>
              </div>        
            </Slider>
        </div>
    </section>
    </>
    )

}
export default TrustedPartners;