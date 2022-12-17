import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { movieService } from "../../services/movie.service";
import moment from "moment";
import Theater from "./Theater";
import background from "../../assets/images/background-movie.jpg";
import BackToTop from "../../components/BackToTop/BackToTop";

export default function DetailPage() {
  const [detailMovie, setDetailMovie] = useState({});
  const [isTrailer, setIsTrailer] = useState(false);
  const [idLink, setIdLink] = useState("");

  let {
    hinhAnh,
    danhGia,
    moTa,
    tenPhim,
    ngayKhoiChieu,
    maPhim,
    heThongRapChieu,
    trailer,
  } = detailMovie;
  let { id } = useParams();
  useEffect(() => {
    const fetchDetailMovie = () => {
      const params = {
        MaPhim: id,
      };
      movieService
        .getDetailMovie(params)
        .then((res) => {
          setDetailMovie(res.data.content);
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    };
    fetchDetailMovie();
  }, [id]);

  let getId = (url) => {
    var regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return "error";
    }
  };
  return (
    <div>
      <Header />
      <div
        className="py-20"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="lg:w-1/3 w-1/2 flex justify-center items-center">
            <div className="w-full lg:h-100 lg:p-5 overflow-hidden">
              <img
                className="w-full h-full object-cover rounded"
                src={hinhAnh}
                alt="img-movie"
              />
            </div>
          </div>
          <div className="text-left lg:text-base md:text-base text-xs font-semibold text-white p-3 lg:w-2/3 w-1/2">
            <h1 className="font-bold lg:text-4xl md:text-3xl text-lg text-red-500 text-transform: capitalize">
              {tenPhim}
            </h1>
            <p>{moTa}</p>
            <p>
              <span>Đánh giá: </span>
              <span>{danhGia}</span>
            </p>
            <p className="">
              <span>Ngày khởi chiếu: </span>
              <span>{moment(ngayKhoiChieu).format("HH:MM ~ DD-MM-YYYY")}</span>
            </p>
            <div className="flex lg:justify-start md:justify-start justify-center items-center space-x-3">
              <button
                onClick={() => {
                  let myId = getId(trailer);
                  setIdLink(myId);
                  setIsTrailer(true);
                }}
                className="flex items-center justify-center p-2 lg:text-base md:text-base text-xs font-medium tracking-wide rounded bg-indigo-700 text-white hover:bg-indigo-500"
              >
                Play Trailer
              </button>
              <NavLink to={`/bookingticket/${maPhim}`} className="inline ml-1">
                <span className="flex items-center justify-center p-2 lg:text-base md:text-base text-xs font-medium tracking-wide rounded bg-indigo-700 text-white hover:bg-indigo-500">
                  Đặt Vé
                </span>
              </NavLink>
            </div>
          </div>
        </div>
        {isTrailer ? (
          <div
            onClick={() => {
              setIsTrailer(false);
            }}
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60  z-10"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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

      <div className="p-10 z-0">
        <Theater theater={heThongRapChieu} />
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
}
