"use client"
import { Button, Form, Input, Checkbox, Typography, notification, Spin } from "antd";
import {LoadingOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import Layout, {Content} from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import {logged, postLoginRequest} from "../../redux/auth/actions";
import {useEffect} from "react";
import { usePrevious } from "@react-hooks-library/core";
import Link from "next/link";
import {instance} from "../../configs/axiosInstance";
import contentStyle from "../../theme/contentStyle";
import { useRouter } from 'next/navigation';
const { Title } = Typography;

export default function SignInComp() {
  const router = useRouter()
  const dispatch = useDispatch();
  const {
    isPostLoginRequest,
    isPostLoginSuccess,
    isPostLoginFailure,
    userData
  } = useSelector(state => state.auth)
  const prevSuccess = usePrevious(isPostLoginSuccess);
  const prevFailure = usePrevious(isPostLoginFailure);


  useEffect(() => {
    if (isPostLoginSuccess && prevSuccess === false) {
      localStorage.setItem("token", userData.token);
      let token = localStorage.getItem("token");
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      router.replace("/");
    }
    if (isPostLoginFailure && prevFailure === false) {
      notification["error"]({
        duration: 3,
        description: "Email or Password is not correct"
      });
    }
  }, [dispatch, isPostLoginFailure, isPostLoginSuccess, prevFailure, prevSuccess, router, userData]);

  const onFinish = (values) => {
    dispatch(postLoginRequest(values));
  };


  return (
    <Content style={{...contentStyle, justifyContent: "left", marginTop: "80px"}}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} spinning={isPostLoginRequest}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          style={{
            background: "white",
            width: "100%",
            padding: "80px",
            boxShadow: "1px 1px 10px 0px rgba(0,0,0,0.75)"}}
          onFinish={onFinish}
        >
          <Form.Item>
            <Title style={{textAlign: "center"}}>Sign In</Title>
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              style={{width: "100%"}}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={isPostLoginRequest}
            >
              Log in
            </Button>
            Or <a href="/signup">register now!</a>
          </Form.Item>
        </Form>
      </Spin>
    </Content>

  );
}