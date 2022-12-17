import React from "react";
import { Tabs } from "antd";
import moment from "moment";
import TabPane from "antd/lib/tabs/TabPane";

export default function Theater({ theater }) {
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
                                  <button className="inline-flex items-center justify-center p-1 tracking-wide rounded bg-indigo-700 text-white hover:bg-indigo-500">
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
    <div className="container mx-auto">
      <h1 className="font-bold lg:text-3xl text-2xl pb-3 text-red-500">
        Lịch chiếu phim
      </h1>
      <div>{renderTheater()}</div>
    </div>
  );
}
