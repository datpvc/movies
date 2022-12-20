import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userInfoLocal } from "../../../services/local.service";
import MessageLogin from "../../../components/Message/MessageLogin";

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
        <MessageLogin navigate={navigate} setIsMessage={setIsMessage} />
      ) : null}
    </div>
  );
}
