"use client"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import contentStyle from "../theme/contentStyle";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getUserPostsRequest } from "../redux/post/actions";
import { useDispatch, useSelector } from "react-redux";
import {getUserByIdRequest} from "../redux/auth/actions";

const UserPostMiddleware = ({children}) => {
   const router = useRouter();
   const {
      isGetUserByIdSuccess,
      isGetUserByIdFailure
   } = useSelector(state => state.auth)
   const dispatch = useDispatch();
   const pathName = usePathname();

   useEffect(() => {
      dispatch(getUserByIdRequest(pathName.split("/")[2]));
   }, [dispatch, pathName])

   console.log("asas")

   if (isGetUserByIdFailure) {
      return router.back();
   } else if (isGetUserByIdSuccess) {
      return children;
   } else {
      return (
         <Content style={contentStyle}>
            <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>
         </Content>
      )
   }
};

export default UserPostMiddleware;