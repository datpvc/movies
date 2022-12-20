import { https } from "./url.config";

export const bookingTicketService = {
  getlistBoxOffice: (params) => {
    let uri = "/api/QuanLyDatVe/LayDanhSachPhongVe";
    return https.get(uri, { params });
  },
  postBookingTicket: (dataBookingTicket) => {
    let uri = "/api/QuanLyDatVe/DatVe";
    return https.post(uri, dataBookingTicket);
  },
};
