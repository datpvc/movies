import React from "react";

export default function MessageLogin({ setIsMessage, navigate }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50">
      <div
        onClick={() => {
          setIsMessage(false);
        }}
        className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
      ></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:text-2xl md:text-2xl text-xl font-bold bg-white lg:p-10 md:p-10 p-4 rounded shadow-2xl z-40 opacity-100 lg:w-1/3 md:w-1/2 w-4/5">
        <div className="flex justify-center items-center m-auto w-20 h-20 text-red-500 text-4xl border-4 border-red-500 rounded-full">
          <i className="fa fa-times"></i>
        </div>
        <p className="mt-4">Bạn cần đăng nhập để đặt vé</p>
        <p className="lg:text-lg md:text-lg text-base font-semibold">
          Bạn muốn đăng nhập không?
        </p>
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="flex items-center justify-center lg:p-3 md:p-3 p-2 lg:text-lg md:text-base text-sm font-semibold tracking-wide rounded bg-indigo-700 text-white hover:bg-indigo-500"
          >
            Đồng ý
          </button>
          <button
            onClick={() => {
              setIsMessage(false);
            }}
            className="flex items-center justify-center lg:p-3 md:p-3 p-2 lg:text-lg md:text-base text-sm font-semibold tracking-wide rounded bg-red-700 text-white hover:bg-red-500"
          >
            Không
          </button>
        </div>
      </div>
    </div>
  );
}
