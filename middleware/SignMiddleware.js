import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import contentStyle from "../theme/contentStyle";

const SignMiddleware = ({children}) => {
   const router = useRouter();
   const [token, setToken] = useState("");

   useEffect(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
         let token = localStorage.getItem("token");
         setToken(token);
      }
   }, [token]);

   if (token) {
      return router.replace("/");
   } else if (token == null) {
      return children;
   } else {
      return <Content style={contentStyle}>
         <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>
      </Content>
   };
};

export default SignMiddleware;