import React from "react";
import background from "../../assets/images/background-movie.jpg";

export default function UserInfoPage() {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
      }}
    >
      <h1 className="text-red-500 text-3xl pt-24">
        Chức năng này đang trong giai đoạn cập nhật
      </h1>
    </div>
  );
}
