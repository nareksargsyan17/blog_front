"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Content} from "antd/es/layout/layout";
import contentStyle from "../theme/contentStyle";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const UserMiddleware = ({children}) => {
   const router = useRouter();
   const [token, setToken] = useState("");

   useEffect(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
         let token = localStorage.getItem("token");
         setToken(token);
      }
   }, [token])

   if (token == null) {
      return router.replace("/signin")
   } else if (token) {
      return children;
   } else {
      return (
         <Content style={contentStyle}>
            <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>
         </Content>
      )
   }
};

export default UserMiddleware;