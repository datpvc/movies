import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserNav from "./UserNav";

export default function Header() {
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setShow(false);
      } else {
        setShow(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`${
        show ? "fixed" : "hidden"
      } bg-black bg-opacity-40 text-white top-0 left-0 right-auto w-full z-50 flex justify-between items-center lg:p-4 p-2 px-4`}
    >
      <div className="container mx-auto lg:flex justify-between items-center h-12">
        <NavLink to="/" className="flex items-center p-2">
          <span className="hover:text-red-700 lg:text-4xl md:text-3xl text-2xl text-red-500 font-bold duration-500 transition-all">
            Movies
          </span>
        </NavLink>
        <ul className="items-stretch space-x-3 lg:flex hidden ">
          <li className="flex">
            <a
              href="#moviesList"
              className="flex items-center font-semibold text-lg text-white hover:text-red-500 duration-500 -mb-1"
            >
              Lịch Chiếu
            </a>
          </li>
          <li className="flex">
            <a
              href="#moviesTabs"
              className="flex items-center font-semibold text-lg text-white hover:text-red-500 duration-500 px-4 -mb-1"
            >
              Cụm Rạp
            </a>
          </li>
          <li className="flex">
            <a
              href="#moviesNews"
              className="flex items-center font-semibold text-lg text-white hover:text-red-500 duration-500 px-4 -mb-1"
            >
              Tin Tức
            </a>
          </li>
          <li className="flex">
            <a
              href="#application"
              className="flex items-center font-semibold text-lg text-white hover:text-red-500 duration-500 px-4 -mb-1"
            >
              Ứng Dụng
            </a>
          </li>
        </ul>
        <div className="lg:block hidden">
          <UserNav />
        </div>
      </div>
      {isOpenNav ? (
        <div className="fixed top-0 left-0 lg:hidden">
          <div
            onClick={() => {
              setIsOpenNav(false);
            }}
            className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-black bg-opacity-60 z-0"
          ></div>
          <div className="fixed top-0 left-0 bg-slate-800 w-44 h-full px-5 z-10">
            <div className="py-8 px-4">
              <UserNav />
            </div>
            <ul className="space-y-7 py-8 px-4">
              <li>
                <a
                  href="#moviesList"
                  className="flex items-center font-semibold text-lg text-white hover:text-red-500 duration-500 -mb-1"
                >
                  Lịch Chiếu
                </a>
              </li>
              <li className="md:flex hidden">
                <a
                  href="#moviesTabs"
                  className="flex items-center font-semibold text-lg text-white hover:text-red-500 duration-500 -mb-1"
                >
                  Cụm Rạp
                </a>
              </li>
              <li>
                <a
                  href="#moviesNews"
                  className="flex items-center font-semibold text-lg text-white hover:text-red-500 duration-500 -mb-1"
                >
                  Tin Tức
                </a>
              </li>
              <li>
                <a
                  href="#application"
                  className="flex items-center font-semibold text-lg text-white hover:text-red-500 duration-500 -mb-1"
                >
                  Ứng Dụng
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
      <button
        onClick={() => {
          if (isOpenNav) {
            setIsOpenNav(false);
          } else {
            setIsOpenNav(true);
          }
        }}
        className="p-4 lg:hidden hover:text-red-500 z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 dark:text-gray-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </header>
  );
}
