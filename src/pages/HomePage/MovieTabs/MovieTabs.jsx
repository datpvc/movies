import React, { useEffect, useState } from "react";
import { movieService } from "../../../services/movie.service";
import { Tabs } from "antd";
import TabPane from "antd/lib/tabs/TabPane";
import MovieTabItem from "./MovieTabItem";
import "../MovieTabs/customTabs.css";

export default function MovieTabs() {
  const [dataRaw, setDatRaw] = useState([]);
  const fetchData = () => {
    movieService
      .getMoviesByTheater()
      .then((res) => {
        setDatRaw(res.data.content);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  let renderContent = () => {
    return dataRaw.map((heThongRap) => {
      return (
        <TabPane
          key={heThongRap.maHeThongRap}
          tab={
            <img className="w-12 h-12" src={heThongRap.logo} alt="img-logo" />
          }
        >
          <Tabs tabPosition="left h-98">
            {heThongRap.lstCumRap.map((cumRap) => {
              return (
                <TabPane
                  key={cumRap.maCumRap}
                  tab={
                    <div className="w-80 border-b pb-2">
                      <p className="m-0 text-base font-bold">
                        {cumRap.tenCumRap}
                      </p>
                      <p className="m-0 text-sm font-medium">
                        {cumRap.diaChi.substr(0, 40) + "..."}
                      </p>
                    </div>
                  }
                  className="overflow-y-scroll h-98"
                >
                  {cumRap.danhSachPhim.map((phim) => {
                    return <MovieTabItem key={phim.maPhim} phim={phim} />;
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };
  return (
    <div
      id="moviesTabs"
      className="container mx-auto bg-white rounded lg:p-10 lg:block md:block hidden"
    >
      <Tabs tabPosition="top">{renderContent()}</Tabs>
    </div>
  );
}
