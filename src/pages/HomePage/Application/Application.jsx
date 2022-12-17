import React from "react";
import imagePhone from "../../../assets/images/img-phone.png";
import background from "../../../assets/images/background-movie.jpg";
import phoneSlider1 from "../../../assets/images/phone-slider-1.jpg";
import phoneSlider2 from "../../../assets/images/phone-slider-2.jpg";
import phoneSlider3 from "../../../assets/images/phone-slider-3.jpg";
import Slider from "react-slick";

export default function Application() {
  const phoneSlider = [phoneSlider1, phoneSlider2, phoneSlider3];
  let renderPhoneSlider = () => {
    return phoneSlider.map((item, index) => {
      return (
        <div key={index}>
          <img
            className="rounded-3xl overflow-hidden"
            src={item}
            alt="-img-phone-slider"
          />
        </div>
      );
    });
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 1000,
    dots: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div
      id="application"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto lg:p-20 md:p-20 md:px-0 px-4 py-10">
        <div className="lg:flex items-center justify-center">
          <div className="text-white lg:text-left text-center">
            <h1 className="text-white lg:text-3xl md:text-3xl text-xl font-bold">
              <p>Ứng dụng tiện lợi dành cho</p>
              <p>người yêu điện ảnh</p>
            </h1>
            <p className="text-base font-semibold lg:px-0 px-2">
              Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và
              đổi quà hấp dẫn.
            </p>
            <button className="p-4 my-4 lg:text-lg md:text-lg text-sm font-medium tracking-wide rounded bg-indigo-700 text-white hover:bg-indigo-500">
              App miễn phí - Tải về ngay
            </button>
            <p className="text-base font-semibold">
              Movies có hai phiên bản{" "}
              <a
                href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197"
                target="_blank"
                className="text-indigo-500 hover:text-red-500"
              >
                IOS
              </a>{" "}
              &{" "}
              <a
                href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123"
                target="_blank"
                className="text-indigo-500 hover:text-red-500"
              >
                Android
              </a>
            </p>
          </div>
          <div className="relative lg:mx-0 lg:px-20 lg:py-10 lg:w-1/3 lg:h-1/3 md:px-10 w-1/2 mx-auto">
            <img src={imagePhone} alt="img-phone" />
            <div className="absolute top-0 left-0 w-full lg:px-22 lg:p-12 md:px-12 md:p-3 p-1 overflow-hidden">
              <Slider {...settings}>{renderPhoneSlider()}</Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
