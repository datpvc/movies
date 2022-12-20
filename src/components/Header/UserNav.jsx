import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userInfoLocal } from "../../services/local.service";

export default function UserNav() {
  let { userInfo } = useSelector((state) => {
    return state.userSlice;
  });
  let handleLogout = () => {
    userInfoLocal.remove();
    window.location.href = "/";
  };
  let renderContent = () => {
    if (userInfo) {
      return (
        <div className="flex items-center justify-center flex-wrap lg:space-x-4">
          <NavLink
            to={"/userinfo"}
            className="text-white font-bold text-base text-left lg:text-center bg-indigo-500 hover:text-white hover:bg-indigo-700 lg:px-6 lg:py-2 rounded duration-500 transition-all w-full lg:w-auto p-2 mb-2 lg:m-0 space-x-1"
          >
            <span className="text-sm">
              <i className="fa fa-user"></i>
            </span>
            <span>{userInfo.hoTen}</span>
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-white font-bold text-base text-left lg:text-center bg-red-500 hover:text-white hover:bg-red-700 lg:px-6 lg:py-2 rounded duration-500 transition-all w-full lg:w-auto p-2 mt-2 lg:m-0"
          >
            Đăng xuất
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center flex-wrap lg:space-x-4">
          <NavLink
            to={"/login"}
            className="text-white font-bold text-base text-left lg:text-center bg-indigo-500 hover:text-white hover:bg-indigo-700 lg:px-6 lg:py-2 rounded duration-500 transition-all w-full lg:w-auto p-2 mb-2 lg:m-0"
          >
            Đăng nhập
          </NavLink>

          <NavLink
            to={"/register"}
            className="text-white font-bold text-base text-left lg:text-center bg-green-500 hover:text-white hover:bg-green-700 lg:px-6 lg:py-2 rounded duration-500 transition-all w-full lg:w-auto p-2 mt-2 lg:m-0"
          >
            Đăng ký
          </NavLink>
        </div>
      );
    }
  };
  return <>{renderContent()}</>;
}
