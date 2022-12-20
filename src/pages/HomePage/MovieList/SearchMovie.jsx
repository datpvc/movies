import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { movieService } from "../../../services/movie.service";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { userInfoLocal } from "../../../services/local.service";
import MessageLogin from "../../../components/Message/MessageLogin";

export default function SearchMovie() {
  // Mã phim để call API lịch chiếu phim
  const [id, setId] = useState(null);
  const [movieSchedule, setMovieSchedule] = useState({});
  const [theaters, setTheaters] = useState([]);
  const [idTheaters, setIdTheaters] = useState("");
  const [maLichChieu, setMalichChieu] = useState(null);
  const [isMessage, setIsMessage] = useState(false);

  let navigate = useNavigate();

  // Danh sách phim từ redux
  let moviesList = useSelector((state) => {
    return state.moviesSlice.moviesReducer;
  });

  // gọi API
  let fetchMovieSchedule = () => {
    if (!id) return;
    const params = {
      MaPhim: id,
    };
    movieService
      .getDetailMovie(params)
      .then((res) => {
        setMovieSchedule(res.data.content);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  let hanldeChangeMovies = (e) => {
    if (e.target.value === "Phim") {
      setId(null);
    } else {
      setId(e.target.value);
    }
  };

  let hanldeChangeTheater = (e) => {
    if (e.target.value === "Rạp") {
      setIdTheaters(null);
    } else {
      setIdTheaters(e.target.value);
    }
  };

  let hanldeChangeTime = (e) => {
    setMalichChieu(e.target.value);
  };

  let hanldeBookkingTicket = () => {
    let _userInfoLocal = userInfoLocal.get();
    if (_userInfoLocal) {
      navigate(`/bookingticket/${maLichChieu}`);
    } else {
      setIsMessage(true);
    }
  };

  let searchIndexTheater = () => {
    return theaters?.findIndex((item) => {
      return item.maCumRap === idTheaters;
    });
  };

  let renderMoviesOption = () => {
    return moviesList?.map((movie) => {
      return (
        <option value={movie.maPhim} key={movie.maPhim}>
          {movie.tenPhim}
        </option>
      );
    });
  };

  let renderTheatersOption = () => {
    if (id) {
      return theaters?.map((theater) => {
        return (
          <option value={theater.maCumRap} key={theater.maCumRap}>
            {theater.tenCumRap}
          </option>
        );
      });
    } else {
      return <option disabled>Vui lòng chọn phim</option>;
    }
  };

  let renderTime = () => {
    if (!id) return <option disabled>Vui lòng chọn phim</option>;
    if (!theaters) return;
    let index = searchIndexTheater();
    if (index !== -1) {
      return theaters[index].lichChieuPhim?.map((item) => {
        return (
          <option value={item.maLichChieu} key={item.maLichChieu}>
            {moment(item.ngayChieuGioChieu).format("HH:MM ~ DD-MM-YYYY")}
          </option>
        );
      });
    } else {
      return <option disabled>Vui lòng chọn rạp</option>;
    }
  };

  useEffect(() => {
    if (!movieSchedule) return;
    const dataTheaters = movieSchedule.heThongRapChieu?.reduce(
      (currVal, nextVal) => {
        const result = nextVal.cumRapChieu?.map((item) => {
          return { ...item };
        });
        return [...currVal, ...result];
      },
      []
    );

    setTheaters(dataTheaters);
  }, [movieSchedule]);

  useEffect(() => {
    fetchMovieSchedule();
  }, [id]);

  return (
    <div className="container mx-auto mb-6">
      <div className="lg:flex md:flex hidden justify-between items-center w-full bg-slate-100 rounded p-2">
        <select
          onChange={hanldeChangeMovies}
          className="lg:w-[400px] md:w-[200px] p-2 border rounded bg-slate-200"
        >
          <option value={null}>Phim</option>
          {renderMoviesOption()}
        </select>
        <select
          onChange={hanldeChangeTheater}
          className="lg:w-[320px] md:w-[150px] p-2 border rounded bg-slate-200"
        >
          <option value={null}>Rạp</option>
          {renderTheatersOption()}
        </select>
        <select
          onChange={hanldeChangeTime}
          className="lg:w-[320px] md:w-[150px] p-2 border rounded bg-slate-200"
        >
          <option>Ngày giờ chiếu</option>
          {renderTime()}
        </select>
        <button
          onClick={() => {
            hanldeBookkingTicket();
          }}
          className="p-2 lg:text-base md:text-base text-xs font-medium tracking-wide rounded bg-indigo-700 text-white hover:bg-indigo-500"
        >
          Mua vé ngay
        </button>
      </div>
      {isMessage ? (
        <MessageLogin navigate={navigate} setIsMessage={setIsMessage} />
      ) : null}
    </div>
  );
}
