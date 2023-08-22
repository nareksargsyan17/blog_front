"use client"
import {Avatar, Button, Card, Empty, Layout, Skeleton, Space, Spin} from "antd";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changePost, getPostsRequest} from "../../redux/post/actions";
import Posts from "./Posts";
import {LoadingOutlined} from "@ant-design/icons";
import Error from "../../app/error";
import {ErrorBoundary} from "react-error-boundary";
import contentStyle from "../../theme/contentStyle";
import SharePost from "./SharePost";
import {usePrevious} from "@react-hooks-library/core";
import {getUserRequest} from "../../redux/auth/actions";
import InfiniteScroll from 'react-infinite-scroll-component';
import page from "../../app/page";

const {Content} = Layout;


export default function MainBar() {
  const {
    isGetPostsSuccess,
    isGetPostsFailure,
    isGetPostsRequest,
    postsData,
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
  const listInnerRef = useRef();

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
    if (isGetPostsSuccess && prevGetSuccess === false && posts.length === 0) {
      setPosts(postsData)
    } else if (isGetPostsFailure) {
      throw new Error("")
    }
  }, [isGetPostsFailure, isGetPostsSuccess, posts, postsData, prevGetSuccess]);

  const onScroll = () => {
    console.log("1223")

    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
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
            ) :  <Empty/>
        }
      </div>
    </ErrorBoundary>
  )
}