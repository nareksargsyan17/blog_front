"use client"
import { Content } from "antd/es/layout/layout";
import contentStyle from "../../theme/contentStyle";
import {Empty, Spin, Typography} from "antd";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getUserLikedPostsRequest, getUserPostsRequest} from "../../redux/post/actions";
import Posts from "../main/Posts";
import CardSkeleton from "../cardSkeleton/CardSkeleton";
import {usePrevious} from "@react-hooks-library/core";
import InfiniteScroll from "react-infinite-scroll-component";

const { Title } = Typography;

export default function LikedPosts() {
   const {
      isGetUserLikedPostsSuccess,
      userLikedPosts
   } = useSelector(state => state.posts);
   const {
      user
   } = useSelector(state => state.auth);
   const [page, setPage] = useState(1);
   const [likedPosts, setPosts] = useState([]);
   const dispatch = useDispatch();
   const prevGetLikedPostsSuccess = usePrevious(isGetUserLikedPostsSuccess);

   useEffect(() => {
      dispatch(getUserLikedPostsRequest({
         id: user?.id,
         page
      }))
   }, [dispatch]);
   
   useEffect(() => {
      if (isGetUserLikedPostsSuccess && prevGetLikedPostsSuccess === false) {
         setPosts([...likedPosts, ...userLikedPosts]);
         setPage(page + 1);
      }
   }, [isGetUserLikedPostsSuccess, likedPosts, page, prevGetLikedPostsSuccess, userLikedPosts])
   
   const getData = () => {
      dispatch(getUserLikedPostsRequest({
         id: user?.id,
         page
      }));
   };

   return (
      <Content style={contentStyle}>
         {
            userLikedPosts ? (
               <>
                  <Title level={4} style={{textAlign: "center",}}>Liked Posts</Title>
                  {
                     likedPosts?.length > 0 ? (
                        <InfiniteScroll
                           next={getData}
                           hasMore={userLikedPosts.length > 0}
                           loader={<Spin/>}
                           dataLength={likedPosts.length}
                           endMessage={<p>No more data to load.</p>}
                        >
                           {
                              likedPosts.map(post => <Posts key={post.id} post={post}/>)
                           }
                        </InfiniteScroll>
                     ) : <Empty/>
                  }
               </>
            ) : (
               <CardSkeleton/>
            )
         }
      </Content>
   )
}