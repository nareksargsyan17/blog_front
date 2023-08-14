"use client"
import {Avatar, Button, Card, Empty, Layout, Skeleton, Space, Spin} from "antd";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPostsRequest} from "../../redux/post/actions";
import Posts from "./Posts";
import {AreaChartOutlined, LoadingOutlined} from "@ant-design/icons";
import Error from "../../app/error";
import {ErrorBoundary} from "react-error-boundary";
import contentStyle from "../../theme/contentStyle";
import SharePost from "./SharePost";

const {Content} = Layout;


export default function MainBar() {
  const {
    isGetPostsSuccess,
    isGetPostsFailure,
    postsData,
  } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState(postsData);
  const [token, setToken] = useState("");

  useEffect(() => {
    dispatch(getPostsRequest(1));
    if (typeof window !== 'undefined'  && window.localStorage) {
      let token = localStorage.getItem("token");
      setToken(token)
    }
  }, [dispatch])

  useEffect(() => {
    if (isGetPostsSuccess) {
      setPosts(postsData)
    } else if (isGetPostsFailure) {
      throw new Error("")
    }
  }, [isGetPostsFailure, isGetPostsSuccess, postsData])
  return (
    <ErrorBoundary fallback={<Error/>}>
      <Content style={contentStyle}>
        {
          token ? (
            <SharePost/>
          ) : null
        }
        {
          isGetPostsSuccess ? (
            posts.length > 0 ? posts.map(post => <Posts key={post.id} post={post}/>) : <Empty/>
          ) : (
            <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>
          )
        }
      </Content>
    </ErrorBoundary>
  )
}