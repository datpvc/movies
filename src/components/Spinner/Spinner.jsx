import React from "react";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";

export default function Spinner() {
  let { isLoading } = useSelector((state) => {
    return state.spinnerSlice;
  });

  return isLoading ? (
    <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-gray-900 z-50">
      <HashLoader size={60} color="#2196f3" />
    </div>
  ) : (
    <></>
  );
}
