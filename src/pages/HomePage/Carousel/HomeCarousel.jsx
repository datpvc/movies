import React, { useEffect, useState } from "react";
import { movieService } from "../../../services/movie.service";
import Slider from "react-slick";
import styleAroww from "../CustomSlick/customSlick.module.css";
import styleSlick from "../CustomSlick/customSlick.module.css";
import "../CustomSlick/customSlick.css";

// Custom arrows slick
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleAroww["slick-next"]}`}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        right: "65px",
        zIndex: 3,
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleAroww["slick-prev"]}`}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        left: "20px",
        zIndex: 3,
      }}
      onClick={onClick}
    />
  );
}

function SampleNextArrowHidden(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrowHidden(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}
// Settings slick
const settings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  dots: false,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        nextArrow: <SampleNextArrowHidden />,
        prevArrow: <SamplePrevArrowHidden />,
        dots: true,
        appendDots: (dots) => (
          <ul style={{ marginBottom: "16px" }}> {dots} </ul>
        ),
        customPaging: () => (
          <div className={`${styleSlick["custom-dots-carousel"]}`}></div>
        ),
      },
    },
  ],
};

export default function HomeCarousel() {
  // Tạo state banners để lưu dữ liệu của banners
  const [banners, setBanners] = useState([]);

  // Hàm gọi dữ liệu banners
  const fetchBanner = () => {
    movieService
      .getBanner()
      .then((res) => {
        setBanners(res.data.content);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  useEffect(() => {
    // gọi dữ liệu về
    fetchBanner();
  }, []);

  // Hàm render banners ra giao diện
  let renderBanner = () => {
    return banners.map((banner) => {
      return (
        <div key={banner.maPhim}>
          <img
            className="w-screen lg:h-128 md:h-97 h-56 object-cover"
            src={banner.hinhAnh}
            alt="banner-img"
          />
        </div>
      );
    });
  };
  return (
    <Slider className="active-dots lg:h-128 md:h-97 h-56 w-full" {...settings}>
      {renderBanner()}
    </Slider>
  );
}
