import axios from "axios";

export const FILM_URL = `https://60b9f19280400f00177b744b.mockapi.io/ArticlesDienAnh02`;
export const REVIEW_URL = `https://60babc8f42e1d0001761ff84.mockapi.io/ArticlesReview02`;
export const DISCOUNT_URL = `https://60babc8f42e1d0001761ff84.mockapi.io/ArticlesKhuyenMai02`;

export const getNews = (url, setState) => {
  return axios({
    url,
    method: "GET",
  })
    .then((res) => {
      setState(res.data);
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};
