import React from "react";
import moment from "moment";

export default function MovieTabItem({ phim }) {
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
                className="p-2 text-sm font-medium tracking-wide rounded bg-indigo-700 text-white hover:bg-indigo-500"
              >
                {moment(lichChieu.ngayChieuGioChieu).format(
                  "HH:MM ~ DD-MM-YYYY"
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
