"use client"
import { Button, Popover, Space, Spin, Avatar, Typography, Skeleton } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LikeOutlined, LogoutOutlined, ToolOutlined, UserOutlined } from "@ant-design/icons";
import { changeUserData, getUserRequest } from "../../redux/auth/actions";
import { useRouter } from "next/navigation";
import {usePrevious} from "@react-hooks-library/core";

const { Text } = Typography;

export default function RegistrationBar() {
   const router = useRouter();
   const {
      user,
      isGetUserRequest,
      isGetUserSuccess
   } = useSelector(state => state.auth);
   const dispatch = useDispatch();
   const [token, setToken] = useState("");
   const [show, setShow] = useState(false);
   const [userData, setUser] = useState(user);
   const prevGetSuccess = usePrevious(isGetUserSuccess);

   useEffect(() => {
      if (typeof window !== 'undefined') {
         let token = localStorage.getItem("token");
         setToken(token);
         if (!token) {
            dispatch(changeUserData(null));
         } else if (token && !user && !isGetUserRequest) {
            dispatch(getUserRequest());
         }
      }
   }, [token, dispatch, user, isGetUserRequest]);

   useEffect(() => {
      if (isGetUserSuccess && prevGetSuccess === false) {
         setUser(user);
      }
   }, [isGetUserSuccess, prevGetSuccess, user]);

   return (
      <Space>
         {token === "" ? (
            <Skeleton.Avatar active style={{marginTop: "15px"}}/>
         ) : (
            token?.length > 0 ? (
               <>
                  <Popover
                     content={
                        <Space direction="vertical">
                           <Button
                              onClick={() => {
                                 router.replace(`/user/${userData?.id}`, {scroll: false});
                              }}
                              size="small"
                              style={{
                                 width: "200px",
                                 display: "flex",
                                 justifyContent: "left",
                                 alignItems: "center",
                                 padding: "20px"
                              }}
                           >
                              <UserOutlined />
                              <Text style={{marginLeft: "20px"}}>Profile</Text>
                           </Button>
                           <Button
                              onClick={() => {
                                 router.push(`/user/likes`, {scroll: false});
                              }}
                              size="small"
                              style={{
                                 width: "200px",
                                 display: "flex",
                                 justifyContent: "left",
                                 alignItems: "center",
                                 padding: "20px"
                              }}
                           >
                              <LikeOutlined />
                              <Text style={{marginLeft: "20px"}}>Liked Posts</Text>
                           </Button>
                           <Button
                              onClick={() => {
                                 router.replace("/change");
                              }}
                              size="small"
                              style={{
                                 width: "200px",
                                 display: "flex",
                                 justifyContent: "left",
                                 alignItems: "center",
                                 padding: "20px"
                              }}
                           >
                              <ToolOutlined />
                              <Text style={{marginLeft: "20px"}}>Change Password</Text>
                           </Button>
                           <Button
                              onClick={() => {
                                 router.replace("/");
                                 localStorage.removeItem("token");
                                 setToken(null);
                                 dispatch(changeUserData(null));
                              }}
                              ize="small"
                              style={{
                                 width: "200px",
                                 display: "flex",
                                 justifyContent: "left",
                                 alignItems: "center",
                                 padding: "20px"
                              }}
                           >
                              <LogoutOutlined/>
                              <Text style={{marginLeft: "20px"}}>Sign Out</Text>
                           </Button>
                        </Space>

                     }
                     trigger="click"
                     open={show}
                     onOpenChange={() => setShow(!show)}
                  >
                     <Avatar
                        src={`http://localhost:3001/${userData?.avatar}`}
                        alt="img"
                        style={{cursor: "pointer"}}
                     />
                  </Popover>
               </>
            ) : (
               <>
                  <Link href="/signin">
                     <Button type="link">Sign In</Button>
                  </Link>
                  <Link href="/signup">
                     <Button type="text">Sign Up</Button>
                  </Link>
               </>
            ))
         }
      </Space>
   )
}