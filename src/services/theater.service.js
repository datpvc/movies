import { https } from "./url.config";

export const theaterServie = {
  getInfoTheater: () => {
    let uri = "/api/QuanLyRap/LayThongTinHeThongRap";
    return https.get(uri);
  },
};
