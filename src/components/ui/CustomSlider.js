  import Slider from "react-slick";
  const commonSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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
  const CustomSlider = ({ customSettings,children }) => {
    // Merge common settings with custom settings
    const settings = { ...commonSettings, ...customSettings };
  
    return (
      <Slider {...settings}>
        {children}
      </Slider>
    );
  };
  export default CustomSlider;
  