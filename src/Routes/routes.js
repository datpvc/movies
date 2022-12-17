import BookingTicketPage from "../pages/BookingTicketPage/BookingTicketPage";
import DetailPage from "../pages/DetailPage/DetailPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

export const routes = [
  {
    key: 1,
    path: "/",
    component: <HomePage />,
  },
  {
    key: 2,
    path: "/login",
    component: <LoginPage />,
  },
  {
    key: 3,
    path: "/register",
    component: <RegisterPage />,
  },
  {
    key: 4,
    path: "/detail/:id",
    component: <DetailPage />,
  },
  {
    key: 5,
    path: "/bookingticket/:id",
    component: <BookingTicketPage />,
  },
];
