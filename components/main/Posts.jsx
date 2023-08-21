import {Avatar, Badge, Card, Typography, Space} from "antd";
import {CommentOutlined, LikeOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import { likePostsRequest } from "../../redux/post/actions";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import checkTime from "../../checkTime/checkTime";

const {Meta} = Card;
const {Text} = Typography;

export default function Posts({post}) {
  const {
    user
  } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [likes, setLike] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setLike(post.likes);
  }, [post?.likes])

  const likePost = () => {
    if (user?.id) {
      dispatch(likePostsRequest(post.id))
      if (likes.find(elem => elem.id === user?.id)) {
        setLike(likes.filter(elem => elem.id !== user.id))
      } else {
        setLike([...likes, user])
      }
    } else if (!user) {
      router.replace("/signin")
    }
  }

  return (
    <Card
      style={{
        width: "100%",
        margin: "20px 0",
        textAlign: "left",
      }}
      title={
        <Space style={{textAlign: "left"}} >
          <Avatar size="large" src={`http://localhost:3001/${post.owner.avatar}`}/>
          <div>
            <Text style={{display: "block", fontSize: "18px"}}>{post.owner.firstName} {post.owner.lastName}</Text>
            <Text style={{fontSize: "9px"}}>{checkTime((new Date() - new Date(post.createdAt)))}</Text>
          </div>
        </Space>
      }
      cover={
        <div
          style={{display: "flex", justifyContent: "center", overflow: "hidden", cursor: "pointer"}}
          onClick={() => router.push(`/${post.id}`)}
        >
          <img
            alt="example"
            src={`http://localhost:3001/${post.image}`}
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
        <Badge count={post?.postComments?.length} key="like" size="middle" offset={[10, 0]} color="#63a4ff">
          <CommentOutlined style={{fontSize: "20px"}}/>
        </Badge>,
      ]}
    >
      <Meta
        style={{cursor: "pointer"}}
        onClick={() => router.push(`/${post.id}`)}
        title={post.title}
        description={post.content.length > 30 ? post.content.slice(0, 30) + "..." : post.content}
      />
    </Card>
  )
}