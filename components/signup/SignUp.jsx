"use client"
import {
   Button,
   Checkbox,
   Form,
   Input,
   Layout,
   notification,
   Result,
   Skeleton
} from 'antd';
import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { usePrevious } from "@react-hooks-library/core";
import Link from "next/link";
import { postRegistrationRequest } from "../../redux/auth/actions";
import { useEffect } from "react";
import contentStyle from "../../theme/contentStyle";

const { Content } = Layout;
const { Title } = Typography;

const formItemLayout = {
   labelCol: {
      xs: {
         span: 24,
      },
      sm: {
         span: 8,
      },
   },
   wrapperCol: {
      xs: {
         span: 24,
      },
      sm: {
         span: 16,
      },
   },
};

const tailFormItemLayout = {
   wrapperCol: {
      xs: {
         span: 24,
         offset: 0,
      },
      sm: {
         span: 16,
         offset: 8
      },
   },
};

const SignUp = () => {
   const [form] = Form.useForm();
   const dispatch = useDispatch();
   const {
      isPostRegistrationRequest,
      isPostRegistrationSuccess,
      isPostRegistrationFailure,
      errorMessage
   } = useSelector(state => state.auth);
   const prevSuccess = usePrevious(isPostRegistrationSuccess);
   const prevFailure = usePrevious(isPostRegistrationFailure);

   useEffect(() => {
      if (isPostRegistrationFailure && prevFailure === false) {
         notification["error"]({
            duration: 3,
            description: errorMessage
         });
      }
   }, [errorMessage, isPostRegistrationFailure, prevFailure]);

   const onFinish = (values) => {
      const {agreement, confirm, ...data} = values;
      dispatch(postRegistrationRequest({...data, re_password: confirm}));
   };

   return (
      <Content style={contentStyle}>
         {
            isPostRegistrationSuccess && prevSuccess === false ? (
               <Skeleton active loading={isPostRegistrationRequest}>
                  <Result
                     status="success"
                     title="You are Successfully registered please Sign In"
                  />
                  <Link href={"/signin"}>
                     <Button type="primary">Sign In</Button>
                  </Link>
               </Skeleton>
            ) : (
               <Form
                  {...formItemLayout}
                  form={form}
                  name="register"
                  onFinish={onFinish}
                  style={{
                     textAlign: "center",
                     width: "100%",
                     background: "white",
                     padding: "40px 100px 40px 0",
                     boxShadow: "1px 1px 10px 0px rgba(0,0,0,0.75)"
                  }}
                  scrollToFirstError
               >
                  <Form.Item
                     {...tailFormItemLayout}
                  >
                     <Title>Registration</Title>
                  </Form.Item>
                  <Form.Item
                     name="firstName"
                     label="FirstName"
                     tooltip="What do you want others to call you?"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your FirstName!',
                           whitespace: true,
                        },
                     ]}
                  >
                     <Input/>
                  </Form.Item>
                  <Form.Item
                     name="lastName"
                     label="LastName"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your LastName!',
                           whitespace: true,
                        },
                     ]}
                  >
                     <Input/>
                  </Form.Item>
                  <Form.Item
                     name="email"
                     label="E-mail"
                     rules={[
                        {
                           type: 'email',
                           message: 'The input is not valid E-mail!',
                        },
                        {
                           required: true,
                           message: 'Please input your E-mail!',
                        },
                     ]}
                  >
                     <Input/>
                  </Form.Item>

                  <Form.Item
                     name="password"
                     label="Password"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your password! (minimum 3 symbol)',
                        },
                        () => ({
                           validator(_, value) {
                              if (value.length >= 3) {
                                 return Promise.resolve();
                              }
                              return Promise.reject(new Error('Password must have at least 3 symbol!'));
                           },
                        }),
                     ]}
                     hasFeedback
                  >
                     <Input.Password/>
                  </Form.Item>

                  <Form.Item
                     name="confirm"
                     label="Confirm Password"
                     dependencies={['password']}
                     hasFeedback
                     rules={[
                        {
                           required: true,
                           message: 'Please confirm your password!',
                        },
                        ({getFieldValue}) => ({
                           validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                 return Promise.resolve();
                              }
                              return Promise.reject(new Error('The new password that you entered do not match!'));
                           },
                        }),
                     ]}
                  >
                     <Input.Password/>
                  </Form.Item>
                  <Form.Item
                     name="agreement"
                     valuePropName="checked"
                     rules={[
                        {
                           validator: (_, value) =>
                              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                     ]}
                     {...tailFormItemLayout}
                  >
                     <Checkbox>
                        I have read the <a href="#">agreement</a>
                     </Checkbox>
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                     <Button
                        style={{width: "100%"}}
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={isPostRegistrationRequest}
                     >
                        Sign Up
                     </Button>
                  </Form.Item>
               </Form>
            )
         }
      </Content>
   );
};
export default SignUp;