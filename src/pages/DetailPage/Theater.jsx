import React, { useState } from "react";
import { Tabs } from "antd";
import moment from "moment";
import TabPane from "antd/lib/tabs/TabPane";
import { useNavigate } from "react-router-dom";
import { userInfoLocal } from "../../services/local.service";

export default function Theater({ theater }) {
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
  let renderTheater = () => {
    if (theater?.length > 0) {
      return (
        <Tabs tabPosition="left">
          {theater?.map((heThongRap) => {
            return (
              <TabPane
                tab={
                  <img
                    className="lg:w-12 md:w-10 w-8"
                    alt="img-logo"
                    src={heThongRap.logo}
                  />
                }
                key={heThongRap.maHeThongRap}
              >
                <Tabs>
                  {heThongRap.cumRapChieu.map((cumRap) => {
                    return (
                      <TabPane
                        key={cumRap.maCumRap}
                        tab={
                          <div className="font-bold lg:text-lg md:text-lg text-sm">
                            {cumRap.tenCumRap}
                          </div>
                        }
                      >
                        <div className="lg:flex md:flex justify-start">
                          <div className="p-2 lg:w-1/4 md:w-1/2 rounded overflow-hidden">
                            <img
                              className="w-full h-full object-cover rounded overflow-hidden"
                              src={cumRap.hinhAnh}
                              alt="img-cumRap"
                            />
                          </div>
                          <div className="text-left lg:text-base md:text-base text-sm font-semibold">
                            {cumRap.lichChieuPhim.map((item) => {
                              return (
                                <div key={item.maLichChieu} className="p-2">
                                  <button
                                    onClick={() => {
                                      hanldeBookingTicket(item.maLichChieu);
                                    }}
                                    className="inline-flex items-center justify-center p-1 tracking-wide rounded bg-indigo-700 text-white hover:bg-indigo-500 hover:text-white"
                                  >
                                    {moment(item.ngayChieuGioChieu).format(
                                      "HH:MM ~ DD-MM-YYYY"
                                    )}
                                  </button>
                                </div>
                              );
                            })}
                            <div className="p-2">
                              <span>Địa chỉ: </span>
                              <span>{cumRap.diaChi}</span>
                            </div>
                          </div>
                        </div>
                      </TabPane>
                    );
                  })}
                </Tabs>
              </TabPane>
            );
          })}
          ;
        </Tabs>
      );
    } else {
      return (
        <div>
          <h1 className="text-xl font-bold text-red-500">
            Hiện tại chưa có thông tin lịch chiếu cho Phim này
          </h1>
        </div>
      );
    }
  };
  return (
    <div id="movieSchedule" className="container mx-auto">
      <h1 className="font-bold lg:text-3xl text-2xl pb-3 text-red-500">
        Lịch chiếu phim
      </h1>
      <div>{renderTheater()}</div>
      {isMessage ? (
        <div className="fixed top-0 left-0 w-full h-full">
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
      ) : null}
    </div>
  );
}
