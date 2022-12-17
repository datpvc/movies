import React, { useEffect, useState } from "react";
import { theaterServie } from "../../services/theater.service";

export default function Footer() {
  const [theater, setTheater] = useState([]);
  const fetchTheater = () => {
    theaterServie
      .getInfoTheater()
      .then((res) => {
        setTheater(res.data.content);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  useEffect(() => {
    fetchTheater();
  }, []);

  let renderTheater = () => {
    return theater?.map((item) => {
      return (
        <li
          key={item.maHeThongRap}
          className="p-2 space-x-2 text-transform: uppercase hover:text-white"
        >
          <img
            className="w-8 h-8 object-cover inline"
            src={item.logo}
            alt="img-theater"
          />
          <span className="text-base font-semibold">{item.tenHeThongRap}</span>
        </li>
      );
    });
  };
  return (
    <footer className="text-gray-500 bg-slate-900">
      <div className="container mx-auto py-5">
        <div className="lg:flex justify-between items-start md:text-base text-sm hidden">
          <div className="w-1/4">
            <h1 className="text-red-500 text-3xl font-bold p-3 hover:text-red-700">
              Movies
            </h1>
            <div className="flex justify-around text-left items-center font-semibold">
              <ul>
                <li className="p-2 hover:text-white">FAQ</li>
                <li className="p-2 hover:text-white">Brand Guidelines</li>
              </ul>
              <ul>
                <li className="p-2 hover:text-white">Thỏa thuận sử dụng</li>
                <li className="p-2 hover:text-white">Chính sách bảo mật</li>
              </ul>
            </div>
          </div>
          <div className="w-1/4 px-10">
            <h1 className="text-xl text-white text-left font-bold text-transform: capitalize p-3">
              Hệ thống rạp
            </h1>
            <ul className="flex flex-col justify-center items-start p-2">
              {renderTheater()}
            </ul>
          </div>
          <div className="w-1/4 px-10">
            <h1 className="text-xl text-white text-left font-bold text-transform: capitalize p-3">
              Mobile app
            </h1>
            <ul className="flex flex-col justify-center items-start font-semibold p-1">
              <li className="p-2 space-x-2 hover:text-white text-2xl flex justify-center items-center">
                <i className="fab fa-app-store"></i>
                <span className="text-base">App store</span>
              </li>
              <li className="p-2 space-x-2 hover:text-white text-2xl flex justify-center items-center">
                <i className="fab fa-android"></i>
                <span className="text-base">CH Play</span>
              </li>
            </ul>
          </div>
          <div className="w-1/4 px-10">
            <h1 className="text-xl text-white text-left font-bold text-transform: capitalize p-3">
              Social
            </h1>
            <ul className="flex flex-col justify-center items-start font-semibold p-1">
              <li className="p-2 space-x-2 hover:text-white text-2xl flex justify-center items-center">
                <i className="fab fa-facebook"></i>
                <span className="text-base">Facebook</span>
              </li>
              <li className="p-2 space-x-2 hover:text-white text-2xl flex justify-center items-center">
                <i className="fab fa-instagram"></i>
                <span className="text-base">Instagram</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="lg:hidden text-sm">
          <div className="text-left px-10">
            <h1 className="text-red-500 md:text-2xl text-xl font-bold p-3 hover:text-red-700">
              Movies
            </h1>
            <div className="flex font-semibold">
              <ul>
                <li className="p-2 hover:text-white">FAQ</li>
                <li className="p-2 hover:text-white">Brand Guidelines</li>
              </ul>
              <ul>
                <li className="p-2 hover:text-white">Thỏa thuận sử dụng</li>
                <li className="p-2 hover:text-white">Chính sách bảo mật</li>
              </ul>
            </div>
          </div>
          <div className="md:flex justify-center items-start">
            <div className="px-10 md:w-1/2">
              <h1 className="md:text-lg text-base text-white text-left font-bold text-transform: capitalize p-3">
                Hệ thống rạp
              </h1>
              <ul className="flex flex-col justify-center items-start p-2">
                {renderTheater()}
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="px-10">
                <h1 className="md:text-lg text-base text-white text-left font-bold text-transform: capitalize p-3">
                  Mobile app
                </h1>
                <ul className="flex flex-col justify-center items-start font-semibold p-1">
                  <li className="p-2 space-x-2 hover:text-white text-2xl flex justify-center items-center">
                    <i className="fab fa-app-store"></i>
                    <span className="text-base">App store</span>
                  </li>
                  <li className="p-2 space-x-2 hover:text-white text-2xl flex justify-center items-center">
                    <i className="fab fa-android"></i>
                    <span className="text-base">CH Play</span>
                  </li>
                </ul>
              </div>
              <div className="px-10">
                <h1 className="md:text-lg text-base text-white text-left font-bold text-transform: capitalize p-3">
                  Social
                </h1>
                <ul className="flex flex-col justify-center items-start font-semibold p-1">
                  <li className="p-2 space-x-2 hover:text-white text-2xl flex justify-center items-center">
                    <i className="fab fa-facebook"></i>
                    <span className="text-base">Facebook</span>
                  </li>
                  <li className="p-2 space-x-2 hover:text-white text-2xl flex justify-center items-center">
                    <i className="fab fa-instagram"></i>
                    <span className="text-base">Instagram</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto border-t-2 p-5">
        <p className="text-baset font-semibold m-0">
          Copyright © 2020.All Rights Reserved By
          <a
            href="https://cybersoft.edu.vn/"
            target="_blank"
            className="text-gray-500 hover:text-red-500"
          >
            {" "}
            CyberSoft
          </a>
        </p>
      </div>
    </footer>
  );
}
