import React, { useEffect, useState } from "react";
import { movieService } from "../../../services/movie.service";
import MovieItem from "./MovieItem";
import Slider from "react-slick";
import styleSlick from "../CustomSlick/customSlick.module.css";
import "../CustomSlick/customSlick.css";
import { setMovieList } from "../../../redux/reducer/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchMovie from "./SearchMovie";
// import background from "../../../assets/images/background-movie.jpg";

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
  infinite: true,
  centerPadding: "100px",
  rows: 1,
  slidesToShow: 4,
  slidesToScroll: 4,
  slidesPerRow: 2,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  dots: true,
  customPaging: () => <div className={`${styleSlick["custom-dots"]}`}></div>,
  responsive: [
    {
      breakpoint: 984,
      settings: {
        infinite: true,
        centerPadding: "100px",
        rows: 1,
        slidesToShow: 3,
        slidesToScroll: 3,
        slidesPerRow: 2,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        dots: true,
        customPaging: () => (
          <div className={`${styleSlick["custom-dots"]}`}></div>
        ),
      },
    },
    {
      breakpoint: 600,
      settings: {
        infinite: true,
        rows: 2,
        slidesToShow: 2,
        slidesToScroll: 2,
        slidesPerRow: 2,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        customPaging: () => (
          <div className={`${styleSlick["custom-dots"]}`}></div>
        ),
      },
    },
  ],
};
export default function MovieList() {
  // Tạo state để lưu dữ liệu của movies
  const [movies, setMovies] = useState([]);
  const [activeBtn, setActiveBtn] = useState(true);
  const dispatch = useDispatch();
  let { moviesReducer } = useSelector((state) => {
    return state.moviesSlice;
  });

  const [isTrailer, setIsTrailer] = useState(false);
  const [idLink, setIdLink] = useState("");

  // Hàm gọi dữ liệu Movies
  const fetchMovies = () => {
    const params = {
      maNhom: "GP03",
      soTrang: 1,
      soPhanTuTrenTrang: 30,
    };
    movieService
      .getMovies(params)
      .then((res) => {
        setMovies(res.data.content.items);
        dispatch(setMovieList(res.data.content.items));
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  useEffect(() => {
    // Gọi dữ liệu về
    fetchMovies();
  }, []);

  //Hàm render dữ liệu ra giao diện
  let renderMovies = () => {
    return movies?.map((movie) => {
      return (
        <div key={movie.maPhim} className={`${styleSlick["width-item"]}`}>
          <MovieItem movie={movie} hanldeShowTrailer={hanldeShowTrailer} />
        </div>
      );
    });
  };

  // Show video trailer
  let hanldeShowTrailer = (trailer) => {
    // lấy id trailer từ dữ liệu trả về
    let getId = (url) => {
      var regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = url.match(regExp);

      if (match && match[2].length == 11) {
        return match[2];
      } else {
        return "error";
      }
    };
    let myId = getId(trailer);
    setIdLink(myId);
    setIsTrailer(true);
  };
  return (
    <div id="moviesList" className="bg-slate-800">
      <div className="container mx-auto lg:py-10 md:py-8 py-6 lg:pb-16 md:pb-12 pb-10">
        <SearchMovie />
        <div className="flex items-center justify-center flex-col">
          <div className="flex justify-center items-center space-x-8 lg:text-[20px] md:text-[20px] text-[16px]">
            <button
              onClick={() => {
                let nowShowing = moviesReducer.filter((movie) => {
                  return movie.dangChieu === true;
                });
                setActiveBtn(true);
                setMovies(nowShowing);
              }}
              className={`h-10 leading-6 m-0 p-1 font-medium text-white lg:hover:text-[30px] md:hover:text-[24px] hover:text-[20px] transition-all  ${
                activeBtn ? "text-indigo-500" : ""
              }`}
            >
              Phim đang chiếu
            </button>
            <button
              onClick={() => {
                let comingSoon = moviesReducer.filter((movie) => {
                  return movie.sapChieu === true;
                });
                setActiveBtn(false);
                setMovies(comingSoon);
              }}
              className={`h-10 leading-6 m-0 p-1 font-medium text-white lg:hover:text-[30px] md:hover:text-[24px] hover:text-[20px] transition-all  ${
                activeBtn ? "" : "text-indigo-500"
              }`}
            >
              Phim sắp chiếu
            </button>
          </div>
        </div>
        <div className="mt-8">
          <Slider {...settings} className="active-dots">
            {renderMovies()}
          </Slider>
        </div>
      </div>
      {isTrailer ? (
        <div
          onClick={() => {
            setIsTrailer(false);
          }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10"
        >
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <button
              onClick={() => {
                setIsTrailer(false);
              }}
              className="text-white text-3xl cursor-pointer absolute -right-6 -top-8 hover:text-red-500"
            >
              <i className="fa fa-times"></i>
            </button>
            <iframe
              className="lg:max-w-none md:max-w-2xl max-w-xs lg:max-h-full md:max-h-96 max-h-64"
              width={885}
              height={498}
              src={`//www.youtube.com/embed/${idLink}`}
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ) : null}
    </div>
  );
}
