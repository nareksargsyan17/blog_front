"use client"
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {likePostsRequest} from "../../redux/post/actions";
import {Avatar, Badge, Card, Layout, Space, Typography} from "antd";
import {CommentOutlined, LikeOutlined} from "@ant-design/icons";
import contentStyle from "../../theme/contentStyle";
import {getUserRequest} from "../../redux/auth/actions";

const {Meta} = Card;
const {Text} = Typography;
const {Content} = Layout;

export default function PostPage() {
  const {
    user
  } = useSelector(state => state.auth);
  const {
    post,
    isLikePostsSuccess
  } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const [likes, setLike] = useState(post.likes);
  const router = useRouter();


  console.log(post, user)
  const likePost = () => {
    if (user?.id) {
      dispatch(likePostsRequest(post.id))
      if (likes.find(elem => elem.id === user?.id)) {
        setLike(likes.filter(elem => elem.id !== user.id))
      } else {
        setLike([...likes, user])
      }
    } else {
      router.replace("/signin")
    }
  }

  function checkTime(time) {
    if ((time / 1000 / 60 / 60 / 24 / 365) > 1 && (time / 1000 / 60 / 60 / 24 / 365) < 365) {
      return `${parseInt((time / 1000 / 60 / 60 / 24 / 365))} years`
    } else if ((time / 1000 / 60 / 60 / 24) > 1 && (time / 1000 / 60 / 60 / 24) < 24) {
      return `${parseInt((time / 1000 / 60 / 60 / 24))} days`
    } else if ((time / 1000 / 60 / 60) > 1 && (time / 1000 / 60 / 60) < 60) {
      return `${parseInt((time / 1000 / 60 / 60))} hours`
    } else if ((time / 1000 / 60) > 1 && (time / 1000 / 60) < 60) {
      return `${parseInt((time / 1000 / 60))} minutes`
    } else if ((time / 1000) > 1 && (time / 1000) < 60) {
      return `${parseInt((time / 1000))} seconds`
    } else if (time < 1000) {
      return `${1} second`
    }
  }

  return (
    <Content style={contentStyle}>
      <Card
        style={{
          width: "100%",
          margin: "20px 0",
          textAlign: "left"
        }}
        title={
          <Space style={{textAlign: "left"}}>
            <Avatar size="large" src={`http://localhost:3001/${post.owner.images.path}`}/>
            <div>
              <Text style={{display: "block", fontSize: "18px"}}>{post.owner.firstName} {post.owner.lastName}</Text>
              <Text style={{fontSize: "9px"}}>{checkTime((new Date() - new Date(post.createdAt)))}</Text>
            </div>
          </Space>
        }
        cover={
          <div
            style={{display: "flex", justifyContent: "center", overflow: "hidden"}}
          >
            <img
              alt="example"
              src={`http://localhost:3001/${post.images.path}`}
              style={{maxHeight: "600px"}}
            />
          </div>
        }
        actions={[
          <Badge count={likes.length} key="like" size="middle" offset={[10, 0]} color="#63a4ff">
            <LikeOutlined onClick={() => {
              likePost()
            }
            } style={{
              padding: "5px 10px",
              fontSize: "20px",
              color: likes.find(like => like.id === user?.id) ? "blue" : "gray"
            }}/>
          </Badge>,
          <Badge count={post.comments.length} key="like" size="middle" offset={[10, 0]} color="#63a4ff">
            <CommentOutlined style={{fontSize: "20px"}}/>
          </Badge>,
        ]}
      >
        <Meta
          title={post.title}
          description={post.content.length > 30 ? post.content.slice(0, 30) + "..." : post.content}
        />
      </Card>
    </Content>
  )
}