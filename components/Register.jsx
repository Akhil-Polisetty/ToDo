"use client";
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const onFinish = async (values) => {
    console.log("entered the onfinsh function");
    console.log("the values are ", values);
    
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        console.log("result succes returned");
        alert("Registered Successfully");
        router.push("/pages/login");
      } else {
        alert("Failed to register");
      }
    } catch (err) {
      console.log("error in registration", err);
      alert("Failed to register");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-full h-[100vh] flex   justify-center items-center   ">
      <Form
        className="border-green-400 pl-4 pr-4 pt-3 glass-effect"
        name="basic"
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          color: "white",
        }}
        initialValues={{
          remember: true,
        }}
        colon={false}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <FormItem
          className="mt-4 "
          label=<span className="custom_label">Username : </span>
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          className="mt-4"
          label=<span className="custom_label">Email : </span>
          name="email"
          
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </FormItem>

        <FormItem
          label=<span className="custom_label">Password :</span>
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input type="password" />
        </FormItem>

        <FormItem
          label=<span className="custom_label">Confirm Password : </span>
          name="confpassword"
          rules={[
            {
              required: true,
              message: "Repeat your password!",
            },
          ]}
        >
          <Input type="password" />
        </FormItem>

        <FormItem name="remember" valuePropName="checked" label={null}>
          <Checkbox>
            <span className="text-white">Remember Me &nbsp;</span>
          </Checkbox>
        </FormItem>

        <p className="text-center text-white mb-4">
          Already have an account? <a href="/pages/login">Login</a>
        </p>

        <FormItem label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};
export default Register;
