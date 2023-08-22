"use client"
import {Button, Card, Image, Popover, Space, Spin, Avatar, Typography} from "antd";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LoadingOutlined, LogoutOutlined, ToolOutlined, UserOutlined} from "@ant-design/icons";
import {changeUserData, getUserRequest} from "../../redux/auth/actions";
import {router} from "next/client";
import {useRouter} from "next/navigation";

const {Text} = Typography;

export default function RegistrationBar() {
    const router = useRouter();
   const {
      user
   } = useSelector(state => state.auth);
   const dispatch = useDispatch();
   const [token, setToken] = useState("");
   const [show, setShow] = useState(false)


   useEffect(() => {
      if (typeof window !== 'undefined') {
         let token = localStorage.getItem("token");
         setToken(token);
         if (!token) {
            dispatch(changeUserData(null));
         } else if (token && !user) {
            dispatch(getUserRequest());
         }
      }
   }, [token, dispatch, user]);

   return (
      <Space>
         {token === "" ? (
            <Spin indicator={<LoadingOutlined
               style={{
                  fontSize: 24,
               }}
               spin
            />}
            />
         ) : (
            token?.length > 0 ? (
               <>
                  <Popover
                     content={
                        <Space direction="vertical">
                           <Button onClick={() => {
                              router.replace(`/user/${user?.id}`);
                           }} size="small" style={{
                              width: "200px",
                              display: "flex",
                              justifyContent: "left",
                              alignItems: "center",
                              padding: "20px"
                           }}>
                              <UserOutlined />
                              <Text style={{marginLeft: "20px"}}>Profile</Text>
                           </Button>
                           <Button onClick={() => {
                              router.replace("/change");
                           }} size="small" style={{
                              width: "200px",
                              display: "flex",
                              justifyContent: "left",
                              alignItems: "center",
                              padding: "20px"
                           }}>
                               <ToolOutlined />
                              <Text style={{marginLeft: "20px"}}>Change Password</Text>
                           </Button>
                           <Button onClick={() => {
                              localStorage.removeItem("token");
                              setToken(null);
                              dispatch(changeUserData(null));
                           }} size="small" style={{
                              width: "200px",
                              display: "flex",
                              justifyContent: "left",
                              alignItems: "center",
                              padding: "20px"
                           }}>
                              <LogoutOutlined/>
                              <Text style={{marginLeft: "20px"}}>Sign Out</Text>
                           </Button>
                        </Space>

                     }
                     trigger="click"
                     open={show}
                     onOpenChange={() => setShow(!show)}
                  >
                     <Avatar src={`http://localhost:3001/${user?.avatar}`} alt="img"
                             style={{cursor: "pointer"}}/>
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