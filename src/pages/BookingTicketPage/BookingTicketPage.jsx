import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { setSelectedSeat } from "../../redux/reducer/seatSlice";
import { bookingTicketService } from "../../services/bookingTicket.service";
import "../BookingTicketPage/bookingTicket.css";

export default function BookingTicketPage() {
  const [movieInfo, setMovieInfo] = useState({});
  const [listSeat, setListSeat] = useState([]);
  const [isMessage, setIsMessage] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let { diaChi, gioChieu, ngayChieu, tenCumRap, tenPhim, tenRap } = movieInfo;

  // Lấy thông tin user từ redux
  let { userInfo } = useSelector((state) => {
    return state.userSlice;
  });

  // lấy thông tin ghế đang đặt từ redux
  let { selectedSeats } = useSelector((state) => {
    return state.seatSlice;
  });

  // lấy mã lịch chiếu
  let { id } = useParams();

  // Gọi API
  useEffect(() => {
    const fetchBoxOffice = () => {
      const params = {
        MaLichChieu: id,
      };
      bookingTicketService
        .getlistBoxOffice(params)
        .then((res) => {
          setMovieInfo(res.data.content.thongTinPhim);
          setListSeat(res.data.content.danhSachGhe);
        })

        .catch((err) => {
          console.log("err: ", err);
        });
    };
    fetchBoxOffice();
  }, [id]);

  let renderSeat = () => {
    return listSeat?.map((seat, index) => {
      // add class các loại ghế
      let classVipSeat = seat.loaiGhe === "Vip" ? "vipSeat" : "";
      let classReservedSeat = seat.daDat === true ? "reservedSeat" : "";
      let classSelectedSeat = "";
      let classMySeat = "";

      // Tìm kiếm các ghế đang đặt trong danh sách ghế
      let indexSelectedSeat = selectedSeats.findIndex((selectedSeat) => {
        return selectedSeat.maGhe === seat.maGhe;
      });

      // Nếu có thì add class của loại ghế đang chọn
      if (indexSelectedSeat !== -1) {
        classSelectedSeat = "selectedSeat";
      }

      // Kiểm tra ghế của bạn đã đặt
      if (userInfo.taiKhoan === seat.taiKhoanNguoiDat) {
        classMySeat = "mySeat";
      }
      return (
        <Fragment key={seat.stt}>
          <button
            key={seat.stt}
            disabled={seat.daDat}
            onClick={() => {
              dispatch(setSelectedSeat(seat));
            }}
            className={`seat ${classVipSeat} ${classReservedSeat} ${classSelectedSeat} ${classMySeat}`}
          >
            {seat.tenGhe}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  // Tính tổng số tiền phải trả
  let result = selectedSeats?.reduce((total, seat) => {
    return (total += seat.giaVe);
  }, 0);

  // Format lại giá tiền
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  // Người dùng đặt vé
  let hanldeBookingTicket = () => {
    const dataBookingTicket = {
      maLichChieu: id,
      danhSachVe: selectedSeats,
    };
    console.log("dataBookingTicket: ", dataBookingTicket);
    bookingTicketService
      .postBookingTicket(dataBookingTicket)
      .then((res) => {
        setIsMessage(true);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  return (
    <div className="lg:grid grid-cols-12 pt-5">
      <div className="col-span-8">
        <div className="flex flex-col items-center">
          <div className="bg-slate-800 w-4/5 h-3"></div>
          <div className="screen">
            <h3 className="lg:mt-4 md:mt-3 mt-1">Màn hình</h3>
          </div>
        </div>
        <div className="lg:mt-0 md:mt-1 mt-3">{renderSeat()}</div>

        <div className="flex justify-center items-center space-x-10 mt-5 text-base font-bold">
          <div>
            <button className="seat reservedSeat"></button>
            <p className="text-red-500">Đã mua</p>
          </div>
          <div>
            <button className="seat selectedSeat"></button>
            <p className="text-green-500">Đang mua</p>
          </div>
          <div>
            <button className="seat"></button>
            <p className="text-gray-500">Thường</p>
          </div>
          <div>
            <button className="seat vipSeat"></button>
            <p className="text-blue-500">Vip</p>
          </div>
        </div>
      </div>
      <div className="col-span-4 shadow-2xl p-5 bg-slate-800 rounded lg:w-4/5">
        <div className="flex flex-col justify-between h-full">
          <div>
            <h1 className="lg:text-3xl md:text-2xl text-xl p-2 text-green-700">
              {formatter.format(result)}
            </h1>
            <hr />
            <h3 className="flex justify-between items-center text-sm text-blue-600 font-bold py-3">
              <span>Tên phim:</span>
              <span>{tenPhim}</span>
            </h3>
            <hr />
            <h3 className="flex justify-between items-center text-sm text-red-500 py-3">
              <span>Ngày giờ chiếu:</span>
              <div>
                <span>{ngayChieu}</span> - <span>{gioChieu}</span>
              </div>
            </h3>
            <hr />
            <h3 className="flex justify-between items-center text-sm text-blue-600 py-3">
              <span>Cum rạp:</span>
              <span>{tenCumRap}</span>
            </h3>
            <hr />
            <h3 className="flex justify-between items-center text-sm text-blue-600 py-3">
              <span>Rạp:</span>
              <span>{tenRap}</span>
            </h3>
            <hr />
            <h3 className="flex justify-between items-center text-sm text-blue-600 py-3">
              <span>Địa chỉ:</span>
              <span>{diaChi}</span>
            </h3>
            <hr />
            <h3 className="flex justify-between items-center text-sm text-blue-600 py-3">
              <span className="w-1/4 text-left">Ghế đã chọn:</span>
              <span className="w-3/4 text-right">
                {selectedSeats?.map((seat) => {
                  return (
                    <span className="mr-1 text-red-500" key={seat.maGhe}>
                      Ghế {seat.tenGhe},
                    </span>
                  );
                })}
              </span>
            </h3>
            <hr />
            <h3 className="flex justify-between items-center text-sm text-blue-600 py-3">
              <span>Email:</span>
              <span>{userInfo.email}</span>
            </h3>
            <hr />
            <h3 className="flex justify-between items-center text-sm text-blue-600 py-3">
              <span>Số điện thoại:</span>
              <span>{userInfo.soDT}</span>
            </h3>
            <hr />
          </div>
          <div className="my-5 flex justify-center items-center space-x-5">
            <button
              onClick={() => {
                hanldeBookingTicket();
              }}
              className="flex items-center justify-center w-full p-3 lg:text-base md:text-base text-xs font-medium tracking-wide rounded-md bg-indigo-700 text-white hover:bg-indigo-500"
            >
              Mua vé
            </button>
            <NavLink
              to={"/"}
              className="flex items-center justify-center w-full p-3 lg:text-base md:text-base text-xs font-medium tracking-wide rounded-md bg-indigo-700 text-white hover:bg-indigo-500 hover:text-white"
            >
              Quay về trang chủ
            </NavLink>
          </div>
        </div>
      </div>

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
            <p className="mt-4">Bạn đã mua vé thành công</p>
            <p className="lg:text-lg md:text-lg text-base font-semibold">
              Bạn có thể xem thông tin vé đã mua ở phần thông tin người dùng
            </p>
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={() => {
                  navigate("/userinfo");
                }}
                className="flex items-center justify-center lg:p-3 md:p-3 p-2 lg:text-lg md:text-base text-sm font-semibold tracking-wide rounded bg-indigo-700 text-white hover:bg-indigo-500"
              >
                Xem
              </button>
              <button
                onClick={() => {
                  setIsMessage(false);
                  window.location.reload();
                }}
                className="flex items-center justify-center lg:p-3 md:p-3 p-2 lg:text-lg md:text-base text-sm font-semibold tracking-wide rounded bg-red-700 text-white hover:bg-red-500"
              >
                Tiếp tục mua vé
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
