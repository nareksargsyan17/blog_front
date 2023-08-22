"use client"
import { Content } from "antd/es/layout/layout";
import contentStyle from "../../theme/contentStyle";
import { Avatar, Empty, Space, Spin, Typography } from "antd";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { getUserPostsRequest } from "../../redux/post/actions";
import Posts from "../main/Posts";
import { LoadingOutlined } from "@ant-design/icons";
const { Text } = Typography;

export default function LikedPosts() {
   const {
      isGetUserLikedPostsSuccess,
      userLikedPosts
   } = useSelector(state => state.posts);
   const dispatch = useDispatch();
   const pathName = usePathname();

   useEffect(() => {
      if (!userLikedPosts) {
         dispatch(getUserPostsRequest({
            id: pathName.split("/")[2],
            page: 1
         }))
      }
   }, [dispatch, pathName, userLikedPosts])

   return (
      <Content style={contentStyle}>
         {
            isGetUserLikedPostsSuccess && userLikedPosts ? (
               <>
                  {
                     userLikedPosts.length > 0 ? (
                        userLikedPosts.map(post => <Posts key={post.id} post={post}/>)) : <Empty/>
                  }
               </>
            ) : (
               <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>
            )
         }
      </Content>
   )
}