"use client"
import { Content } from "antd/es/layout/layout";
import contentStyle from "../../theme/contentStyle";
import { Empty, Spin, Typography } from "antd";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import {getUserLikedPostsRequest, getUserPostsRequest} from "../../redux/post/actions";
import Posts from "../main/Posts";
import { LoadingOutlined } from "@ant-design/icons";
const { Title } = Typography;

export default function LikedPosts() {
   const {
      isGetUserLikedPostsSuccess,
      userLikedPosts
   } = useSelector(state => state.posts);
   const {
      user
   } = useSelector(state => state.auth);
   const dispatch = useDispatch();

   console.log(userLikedPosts)
   useEffect(() => {
      dispatch(getUserLikedPostsRequest({
         id: user?.id,
         page: 1
      }))
   }, [dispatch, user?.id])

   return (
      <Content style={contentStyle}>
         {
            isGetUserLikedPostsSuccess && userLikedPosts ? (
               <>
                  <Title level={4} style={{ textAlign: "center",}}>Liked Posts</Title>
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