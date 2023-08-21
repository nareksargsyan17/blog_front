"use client"
import {Avatar, Button, Card, Empty, Layout, Skeleton, Space, Spin} from "antd";
import {useEffect, useState} from "react";
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

const {Content} = Layout;


export default function MainBar() {
  const {
    isGetPostsSuccess,
    isGetPostsFailure,
    postsData,
  } = useSelector(state => state.posts);
  const {
    user
  } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const prevGetSuccess = usePrevious(isGetPostsSuccess);
  const [posts, setPosts] = useState(postsData);
  const [token, setToken] = useState("");

  useEffect(() => {
    dispatch(getPostsRequest(1));
  }, [dispatch]);

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
    if (isGetPostsSuccess && prevGetSuccess === false) {
      setPosts(postsData)
    } else if (isGetPostsFailure) {
      throw new Error("")
    }
  }, [isGetPostsFailure, isGetPostsSuccess, postsData, prevGetSuccess]);

  return (
    <ErrorBoundary fallback={<Error/>}>
      <Content style={contentStyle}>
        {
          token && user ? (
            <SharePost setPosts={setPosts}/>
          ) : null
        }
        {
          isGetPostsSuccess && posts ? (
            posts.length > 0 ? posts.map(post => <Posts key={post.id} post={post}/>) : <Empty/>
          ) : (
            <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>
          )
        }
      </Content>
    </ErrorBoundary>
  )
}