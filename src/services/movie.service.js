import { https } from "./url.config";

export const movieService = {
  getBanner: () => {
    let uri = "/api/QuanLyPhim/LayDanhSachBanner";
    return https.get(uri);
  },
  getMovies: (params) => {
    let uri = "/api/QuanLyPhim/LayDanhSachPhimPhanTrang";
    return https.get(uri, { params });
  },
  getDetailMovie: (params) => {
    let uri = "/api/QuanLyRap/LayThongTinLichChieuPhim";
    return https.get(uri, { params });
  },
  getMoviesByTheater: () => {
    let uri = "/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP03";
    return https.get(uri);
  },
};
