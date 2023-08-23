"use client"
import {Empty} from "antd";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPostsRequest} from "../../redux/post/actions";
import Posts from "./Posts";
import Error from "../../app/error";
import {ErrorBoundary} from "react-error-boundary";
import contentStyle from "../../theme/contentStyle";
import SharePost from "./SharePost";
import {usePrevious} from "@react-hooks-library/core";
import {getUserRequest} from "../../redux/auth/actions";
import {useRouter} from "next/navigation";


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
      user
   } = useSelector(state => state.auth);
   const dispatch = useDispatch();
   const prevGetSuccess = usePrevious(isGetPostsSuccess);
   const [posts, setPosts] = useState([]);
   const [token, setToken] = useState("");
   const [currPage, setCurrPage] = useState(1); // storing current page number
   const [prevPage, setPrevPage] = useState(0); // storing prev page number
   const [wasLastList, setWasLastList] = useState(false); // setting a flag to know the last list
   const prevEditPostsSuccess = usePrevious(isEditPostsSuccess);
   const prevDeleteSuccess = usePrevious(isDeletePostsSuccess);
   const listInnerRef = useRef();
   const router = useRouter();

   useEffect(() => {
      dispatch(getPostsRequest(currPage));
   }, [currPage, dispatch])

   useEffect(() => {

      const getData = () => {

         if (!postsData.length) {
            setWasLastList(true)
         }
         setPrevPage(currPage);
         setPosts([...posts, ...postsData])
      }
      if (!wasLastList && prevPage !== currPage) {
         getData();
      }
   }, [currPage, posts, postsData, prevPage, wasLastList])


   useEffect(() => {
      if (typeof window !== 'undefined') {
         let token = localStorage.getItem("token");
         setToken(token);
         if (token && !user) {
            dispatch(getUserRequest());
         }
      }
   }, [dispatch, user]);

   useEffect(() => {
      if (isEditPostsSuccess && prevEditPostsSuccess === false) {
        router.replace(`/${updatedPost.id}`)
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
      if (isDeletePostsSuccess) {
         setPosts((oldPosts) => oldPosts.filter(elem => elem.id !== parseInt(deletedId)))
      }
   }, [deletedId, isDeletePostsSuccess, router]);

   useEffect(() => {
      if (isGetPostsSuccess && prevGetSuccess === false && posts.length === 0) {
         setPosts(postsData);
      } else if (isGetPostsFailure) {
         throw new Error("")
      }
   }, [isGetPostsFailure, isGetPostsSuccess, posts, postsData, prevGetSuccess]);

   const onScroll = () => {
      console.log("1223")

      if (listInnerRef.current) {
         const {scrollTop, scrollHeight, clientHeight} = listInnerRef.current;
         console.log(listInnerRef.current)
         if (scrollTop + clientHeight + 80 >= scrollHeight) {
            // This will be triggered after hitting the last element.
            // API call should be made here while implementing pagination.
            setCurrPage(currPage + 1)
         }
      }
   };

   return (
      <ErrorBoundary fallback={<Error/>}>
         <div style={{...contentStyle, overflow: "scroll"}}
              onScroll={(e) => console.log(e)}
              ref={listInnerRef}
         >
            {
               token && user ? (
                  <SharePost setPosts={setPosts}/>
               ) : null
            }
            {
               posts.length > 0 ? (
                  <>
                     {
                        posts.map(post => <Posts key={post.id} post={post}/>)
                     }
                  </>
               ) : <Empty/>
            }
         </div>
      </ErrorBoundary>
   )
}