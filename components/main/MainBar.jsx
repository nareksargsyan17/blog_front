import { Layout } from "antd";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPostsRequest} from "../../redux/post/actions";
import Posts from "./Posts";
const { Content } = Layout;

const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: 'rgb(25 25 25)',
  backgroundColor: 'rgb(243 242 239)',
  width: "100%",
  padding: "0 30%"
};

export default function MainBar() {
  const {
    isGetPostsRequest,
    isGetPostsSuccess,
    isGetPostsFailure,
    postsData,
  } = useSelector(state => state.posts)
  
  const dispatch = useDispatch();
  const [posts, setPosts] = useState(postsData)
  
  useEffect(() => {
    dispatch(getPostsRequest(1))
  }, [dispatch])
  
  useEffect(() => {
    if (isGetPostsSuccess) {
      setPosts(postsData)
    }
  }, [isGetPostsSuccess, postsData])

  console.log(posts)
  
  return (
    <Content style={contentStyle}>
      {
        posts.map(post => <Posts key={post.id} post={post} />)
      }
    </Content>
  )
}