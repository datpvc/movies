import React from "react";
import background from "../../assets/images/background-movie.jpg";
import { Button, Form, Input, Select } from "antd";
import { message } from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { userService } from "../../services/user.service";
const { Option } = Select;
export default function RegisterPage() {
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const onFinish = (values) => {
    let dataRegister = { ...values, maNhom: "GP03" };
    console.log("dataRegister: ", dataRegister);
    userService
      .postRegister(dataRegister)
      .then((res) => {
        console.log("res: ", res);
        setTimeout(() => {
          navigate("/login");
        }, 500);
        message.success("Chúc mừng, Bạn đã đăng ký thành công!");
      })
      .catch((err) => {
        console.log("err: ", err);
        message.error(err.response.data.content);
      });
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        defaultValue={"+84"}
        style={{
          width: 70,
        }}
      >
        <Option value="+84">+84</Option>
        <Option value="+87">+87</Option>
      </Select>
    </Form.Item>
  );
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
      <div className="container mx-auto lg:pt-28 md:pt-60 pt-32">
        <div className="mx-auto bg-white lg:px-12 lg:py-6 md:px-12 md:py-6 p-6 rounded-xl lg:w-1/3 md:w-2/3">
          <div className="lg:text-2xl md:text-2xl text-x text-white">
            <span className="flex justify-center items-center w-14 h-14 rounded-full bg-blue-500 mx-auto">
              <i className="fa fa-user-edit"></i>
            </span>
            <h1 className="text-blue-500 font-bold mt-2 mb-6">Đăng ký</h1>
          </div>
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="taiKhoan"
              rules={[
                {
                  required: true,
                  message: "Trường này không được để trống!",
                  whitespace: true,
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
              // hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Mật khẩu"
              />
            </Form.Item>

            {/* <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Trường này không được để trống!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("matKhau") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Hai mật khẩu đã nhập không khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Nhập lại mật khẩu"
              />
            </Form.Item> */}

            <Form.Item
              name="hoTen"
              rules={[
                {
                  required: true,
                  message: "Trường này không được để trống!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Họ tên"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Email không hợp lệ",
                },
                {
                  required: true,
                  message: "Trường này không được để trống!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="soDt"
              rules={[
                {
                  required: true,
                  message: "Trường này không được để trống!",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="Số điện thoại"
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đăng ký
              </Button>
              <div className="mt-5">
                <span>Bạn đã có tài khoản?</span>{" "}
                <NavLink to={"/login"}>Đăng nhập</NavLink>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
