import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import spinnerSlice from "./redux/reducer/spinnerSlice";
import moviesSlice from "./redux/reducer/moviesSlice";
import userSlice from "./redux/reducer/userSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));
export const store = configureStore({
  reducer: {
    spinnerSlice,
    moviesSlice,
    userSlice,
  },
});
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
