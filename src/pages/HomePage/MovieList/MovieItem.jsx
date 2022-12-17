import React from "react";
import { NavLink } from "react-router-dom";

export default function MovieItem({ movie, hanldeShowTrailer }) {
  let { tenPhim, hinhAnh, maPhim, trailer } = movie;
  return (
    <div className="relative rounded-md shadow-2xl text-gray-100 lg:mb-6 lg:mr-10 lg:h-96 md:h-80 h-72 mr-5 mb-3 overflow-hidden">
      <div className="w-full relative">
        <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-60 opacity-0 hover:opacity-100 duration-500 transition-all">
          <button
            onClick={() => {
              hanldeShowTrailer(trailer);
            }}
            className="absolute lg:top-1/2 md:top-1/3 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-5xl rounded-full flex justify-center items-start"
          >
            <i className="fa fa-play-circle"></i>
          </button>
        </div>
        <img
          src={hinhAnh}
          alt="img-movie"
          className="object-cover object-center w-full rounded-t-md h-96"
        />
      </div>
      <div className="flex flex-wrap bg-opacity-20 bg-gray-900 absolute left-0 bottom-0 z-10">
        <h2 className="lg:text-base md:text-sm text-xs font-semibold text-white text-transform: capitalize tracking-wide w-full lg:h-12 md:h-12 h-10 p-3">
          {tenPhim}
        </h2>
        <div className="flex justify-between items-center w-full p-2 space-x-3">
          <NavLink to={`/detail/${maPhim}`} className="w-1/2">
            <span className="flex items-center justify-center w-full p-1 lg:text-base md:text-sm text-xs font-semibold tracking-wide rounded bg-indigo-700 text-white hover:bg-indigo-500">
              Chi tiết
            </span>
          </NavLink>
          <NavLink to={`/bookingticket/${maPhim}`} className="w-1/2 ">
            <span className="flex items-center justify-center w-full p-1 lg:text-base md:text-sm text-xs font-semibold tracking-wide rounded bg-indigo-700 text-white hover:bg-indigo-500">
              Đặt vé
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
