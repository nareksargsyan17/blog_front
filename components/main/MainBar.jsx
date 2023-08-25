"use client"
import { Empty, notification, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsRequest } from "../../redux/post/actions";
import Posts from "./Posts";
import Error from "../../app/[locale]/error";
import { ErrorBoundary } from "react-error-boundary";
import contentStyle from "../../theme/contentStyle";
import SharePost from "./SharePost";
import { usePrevious } from "@react-hooks-library/core";
import { getUserRequest } from "../../redux/auth/actions";
import { useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { Content } from "antd/es/layout/layout";
import CardSkeleton from "../cardSkeleton/CardSkeleton";


export default function MainBar() {
   const {
      isGetPostsSuccess,
      isGetPostsFailure,
      isEditPostsSuccess,
      isDeletePostsSuccess,
      postsData,
      updatedPost,
      deletedId
   } = useSelector(state => state.posts);
   const {
      user,
      isGetUserRequest
   } = useSelector(state => state.auth);
   const dispatch = useDispatch();
   const router = useRouter();
   const [posts, setPosts] = useState([]);
   const [token, setToken] = useState("");
   const [page, setPage] = useState(2);
   const prevEditPostsSuccess = usePrevious(isEditPostsSuccess);
   const prevGetSuccess = usePrevious(isGetPostsSuccess);
   const prevDeleteSuccess = usePrevious(isDeletePostsSuccess);

   useEffect(() => {
      if (posts.length === 0) {
         dispatch(getPostsRequest(1));
      }
   }, [dispatch, posts.length]);


   const getData = () => {
      dispatch(getPostsRequest(page));
      setPage(page + 1);
   };


   useEffect(() => {
      if (typeof window !== 'undefined') {
         let token = localStorage.getItem("token");
         setToken(token);
         if (token && !user && !isGetUserRequest) {
            dispatch(getUserRequest());
         }
      }
   }, [dispatch, isGetUserRequest, user]);

   useEffect(() => {
      if (isEditPostsSuccess && prevEditPostsSuccess === false) {
         notification["success"]({
            duration: 3,
            description: "Post was Updated"
         });
         router.replace(`/${updatedPost.id}`);
         setPosts((prevValues) => {
            return prevValues.map((post) => {
               if (post.id === updatedPost.id) {
                  return {...post, ...updatedPost}
               }
               return post
            });
         })
      }
   }, [isEditPostsSuccess, prevEditPostsSuccess, router, updatedPost]);

   useEffect(() => {
      if (isDeletePostsSuccess && prevDeleteSuccess === false) {
         notification["success"]({
            duration: 3,
            description: "Delete post Completed"
         });
         setPosts((oldPosts) => oldPosts.filter(elem => elem.id !== parseInt(deletedId)));
      }
   }, [deletedId, isDeletePostsSuccess, prevDeleteSuccess, router]);

   useEffect(() => {
      if (isGetPostsSuccess && prevGetSuccess === false) {
         setPosts([...posts, ...postsData]);
      } else if (isGetPostsFailure) {
         throw new Error("")
      }
   }, [isGetPostsFailure, isGetPostsSuccess, page, posts, postsData, prevGetSuccess]);


   return (
      <ErrorBoundary fallback={<Error/>}>
         <Content style={contentStyle}>
            {
               token && user ? (
                  <SharePost setPosts={setPosts}/>
               ) : null
            }
            {
               postsData ? (
                  posts.length > 0 ? (
                     <>
                        <InfiniteScroll
                           next={getData}
                           hasMore={postsData.length > 0}
                           loader={<Spin/>}
                           dataLength={posts.length}
                           endMessage={<p>No more data to load.</p>}
                        >
                           {
                              posts.map(post => <Posts key={post.id} post={post}/>)
                           }
                        </InfiniteScroll>
                     </>
                  ) : <Empty/>
               ) : ( <CardSkeleton/>)
            }
         </Content>
      </ErrorBoundary>
   )
}