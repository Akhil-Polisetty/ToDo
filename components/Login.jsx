"use client"
import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const Login = () => {
  // const [usermail,setUserMail] =useState("");
  

  const router = useRouter();
  const onFinish = async (values) => {
    //   alert('succes')

    console.log(values);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    console.log(response.status);
    if (response.status == 200) {
      const data=await response.json();
      console.log(data.email)
      const usermail = data.email;
      // setUserMail(data.email);
      console.log(usermail);
      console.log("logged in successfully");
      // document.cookie = `email=${usermail}; path=/; HttpOnly; Secure`;
      // localStorage.setItem("email", usermail); // Assuming token_value is your actual token value
      Cookies.set("email", usermail);
      Cookies.set("username",data.username);
      
      alert("Login success");
      router.push("/pages/home");

    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="w-full h-[100vh] flex justify-center items-center   ">
      <Form
        className="border-green-400  p-4 glass-effect"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        colon={false}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          className="mt-4"
          label=<span className="custom_label">Username &nbsp;</span>
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label=<span className="custom_label">Password &nbsp;</span>
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox><span className="text-white">Remember Me</span></Checkbox>
        </Form.Item>
        <p className="text-center text-white mb-4">
          Don't have an account? <a href="/register">Register</a>
        </p>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>{" "}
    </div>
  );
};
export default Login;
