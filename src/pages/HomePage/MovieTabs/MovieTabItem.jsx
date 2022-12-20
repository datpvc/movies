import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userInfoLocal } from "../../../services/local.service";

export default function MovieTabItem({ phim }) {
  const [isMessage, setIsMessage] = useState(false);
  let navigate = useNavigate();
  let hanldeBookingTicket = (id) => {
    let _userInfoLocal = userInfoLocal.get();
    if (_userInfoLocal) {
      navigate(`/bookingticket/${id}`);
    } else {
      setIsMessage(true);
    }
  };
  return (
    <div className="flex justify-between border-b">
      <div className="lg:w-1/4 w-1/2 h-72 p-2">
        <img
          className="w-full h-full object-cover rounded"
          src={phim.hinhAnh}
          alt="img-movie"
        />
      </div>
      <div className="text-left lg:w-3/4 w-1/2 p-2">
        <p className="font-bold text-lg text-transform: capitalize">
          {phim.tenPhim}
        </p>
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-3">
          {phim.lstLichChieuTheoPhim.map((lichChieu) => {
            return (
              <button
                key={lichChieu.maLichChieu}
                onClick={() => {
                  hanldeBookingTicket(lichChieu.maLichChieu);
                }}
                className="p-2 text-sm font-medium tracking-wide rounded bg-indigo-700 text-white hover:bg-indigo-500 hover:text-white"
              >
                {moment(lichChieu.ngayChieuGioChieu).format(
                  "HH:MM ~ DD-MM-YYYY"
                )}
              </button>
            );
          })}
        </div>
      </div>
      {isMessage ? (
        <div className="fixed top-0 left-0 w-full h-full z-10">
          <div
            onClick={() => {
              setIsMessage(false);
            }}
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          ></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold bg-white p-10 rounded shadow-2xl z-40 opacity-100 lg:w-1/3 md:w-1/2">
            <div className="flex justify-center items-center m-auto w-20 h-20 text-red-500 text-4xl border-4 border-red-500 rounded-full">
              <i className="fa fa-times"></i>
            </div>
            <p className="mt-4">Bạn cần đăng nhập để đặt vé</p>
            <p className="text-lg font-semibold">Bạn muốn đăng nhập không?</p>
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="flex items-center justify-center p-3 lg:text-lg md:text-base text-sm font-semibold tracking-wide rounded bg-indigo-700 text-white hover:bg-indigo-500"
              >
                Đồng ý
              </button>
              <button
                onClick={() => {
                  setIsMessage(false);
                }}
                className="flex items-center justify-center p-3 lg:text-lg md:text-base text-sm font-semibold tracking-wide rounded bg-red-700 text-white hover:bg-red-500"
              >
                Không
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
