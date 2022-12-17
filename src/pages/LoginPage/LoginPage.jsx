import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import background from "../../assets/images/background-movie.jpg";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { userService } from "../../services/user.service";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/reducer/userSlice";
import { userInfoLocal } from "../../services/local.service";

export default function LoginPage() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    let _userInfoLocal = userInfoLocal.get();
    if (_userInfoLocal) {
      navigate("/");
    }
  }, []);
  const onFinish = (values) => {
    userService
      .postLogin(values)
      .then((res) => {
        userInfoLocal.set(res.data.content);
        dispatch(setUserInfo(res.data.content));
        message.success("Đăng nhập thành công!");
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((err) => {
        console.log("err: ", err);
        message.error(err.response.data.content);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Header />

      <div className="container mx-auto lg:pt-40 md:pt-72 pt-44">
        <div className="mx-auto bg-white lg:px-12 lg:py-6 md:px-12 md:py-6 p-6 rounded-xl lg:w-1/3 md:w-2/3">
          <div className="lg:text-2xl md:text-2xl text-xl text-white mt-6">
            <span className="flex justify-center items-center w-14 h-14 rounded-full bg-blue-500 mx-auto">
              <i className="fa fa-user"></i>
            </span>
            <h1 className="text-blue-500 font-bold mt-2 mb-6">Đăng Nhập</h1>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="taiKhoan"
              rules={[
                {
                  required: true,
                  message: "Trường này không được để trống!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Tài khoản"
              />
            </Form.Item>
            <Form.Item
              name="matKhau"
              rules={[
                {
                  required: true,
                  message: "Trường này không được để trống!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Đăng Nhập
              </Button>
              <div className="mt-5">
                <span>Bạn chưa có tài khoản?</span>{" "}
                <NavLink to={"/register"}>Đăng ký</NavLink>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
