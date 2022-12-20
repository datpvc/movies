import React, { useState } from "react";
import { Tabs } from "antd";

import { useEffect } from "react";
import {
  getNews,
  FILM_URL,
  REVIEW_URL,
  DISCOUNT_URL,
} from "../../../services/news.service";

export default function MovieNews() {
  const [newsFilm, setNewsFilm] = useState([]);
  const [newsReview, setNewsReview] = useState([]);
  const [newsDiscount, setNewsDiscount] = useState([]);

  const fetchNews = () => {
    getNews(FILM_URL, setNewsFilm);
    getNews(REVIEW_URL, setNewsReview);
    getNews(DISCOUNT_URL, setNewsDiscount);
  };
  useEffect(() => {
    fetchNews();
  }, []);

  let renderContent = (dataNews) => {
    if (dataNews.length > 0) {
      return (
        <div className="lg:grid grid-cols-6 gap-4 text-left z-0">
          <div className="col-span-3">
            <a href={dataNews[0].url}>
              <div className="rounded overflow-hidden">
                <img src={dataNews[0].img} alt="img-news" />
              </div>
              <h1 className="text-base font-bold mt-2 hover:text-blue-600 transition-all">
                {dataNews[0].title}
              </h1>
            </a>
            <p>{dataNews[0].text}</p>
          </div>
          <div className="col-span-3">
            <a href={dataNews[1].url}>
              <div className="rounded overflow-hidden">
                <img src={dataNews[1].img} alt="img-news" />
              </div>
              <h1 className="text-base font-bold mt-2 hover:text-blue-600 transition-all">
                {dataNews[1].title}
              </h1>
            </a>
            <p>{dataNews[1].text.substr(0, 170) + "..."}</p>
          </div>
          <div className="col-span-2">
            <a href={dataNews[2].url}>
              <div className="rounded overflow-hidden">
                <img src={dataNews[2].img} alt="img-news" />
              </div>
              <h1 className="text-base font-bold mt-2 hover:text-blue-600 transition-all">
                {dataNews[2].title.substr(0, 50) + "..."}
              </h1>
            </a>
            <p>{dataNews[2].text}</p>
          </div>
          <div className="col-span-2">
            <a href={dataNews[3].url}>
              <div className="rounded overflow-hidden">
                <img src={dataNews[3].img} alt="img-news" />
              </div>
              <h1 className="text-base font-bold mt-2 hover:text-blue-600 transition-all">
                {dataNews[3].title}
              </h1>
            </a>
            <p>{dataNews[3].text}</p>
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <a href={dataNews[4].url} className="flex justify-between">
                  <div className="w-20 h-20 rounded overflow-hidden">
                    <img
                      className="w-full"
                      src={dataNews[4].img}
                      alt="img-news"
                    />
                  </div>
                  <h1 className="lg:w-3/4 md:w-5/6 w-2/3 text-base hover:text-blue-600 transition-all">
                    {dataNews[4].title}
                  </h1>
                </a>
              </div>
              <div>
                <a href={dataNews[5].url} className="flex justify-between">
                  <div className="w-20 h-20 rounded overflow-hidden">
                    <img
                      className="w-full"
                      src={dataNews[5].img}
                      alt="img-news"
                    />
                  </div>
                  <h1 className="lg:w-3/4 md:w-5/6 w-2/3 text-base hover:text-blue-600 transition-all">
                    {dataNews[5].title}
                  </h1>
                </a>
              </div>
              <div>
                <a href={dataNews[6].url} className="flex justify-between">
                  <div className="w-20 h-20 rounded overflow-hidden">
                    <img
                      className="w-full"
                      src={dataNews[6].img}
                      alt="img-news"
                    />
                  </div>
                  <h1 className="lg:w-3/4 md:w-5/6 w-2/3 text-base hover:text-blue-600 transition-all">
                    {dataNews[6].title}
                  </h1>
                </a>
              </div>
              <div>
                <a href={dataNews[7].url} className="flex justify-between">
                  <div className="w-20 h-20 rounded overflow-hidden">
                    <img
                      className="w-full"
                      src={dataNews[7].img}
                      alt="img-news"
                    />
                  </div>
                  <h1 className="lg:w-3/4 md:w-5/6 w-2/3 text-base hover:text-blue-600 transition-all">
                    {dataNews[7].title}
                  </h1>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const items = [
    {
      label: (
        <div className="lg:text-xl md:text-lg text-base font-semibold">
          Điểm Ảnh 24h
        </div>
      ),
      key: "1",
      children: renderContent(newsFilm),
    },
    {
      label: (
        <div className="lg:text-xl md:text-lg text-base font-semibold">
          Review
        </div>
      ),
      key: "2",
      children: renderContent(newsReview),
    },
    {
      label: (
        <div className="lg:text-xl md:text-lg text-base font-semibold">
          Khuyễn Mãi
        </div>
      ),
      key: "3",
      children: renderContent(newsDiscount),
    },
  ];

  return (
    <div id="moviesNews" className="container mx-auto z-0">
      <div className="p-10">
        <Tabs defaultActiveKey="1" centered items={items} />
      </div>
    </div>
  );
}
