import React, { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`${
        show ? "fixed" : "hidden"
      } lg:right-8 lg:bottom-8 md:right-5 md:bottom-5 right-2 bottom-2 transition-all`}
    >
      <button
        onClick={goToTop}
        className="flex justify-center items-center bg-blue-600 lg:w-12 lg:h-12 md:w-10 md:h-10 w-8 h-8 text-slate-200 hover:text-white lg:text-xl md:text-xl text-base rounded-sm transition-all"
      >
        <i className="fa fa-arrow-up"></i>
      </button>
    </div>
  );
}
