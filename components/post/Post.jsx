"use client"
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {likePostsRequest} from "../../redux/post/actions";
import { Avatar, Badge, Card, Empty, Layout, Space, Typography, Modal } from "antd";
import {CloseOutlined, CommentOutlined, LikeOutlined} from "@ant-design/icons";
import contentStyle from "../../theme/contentStyle";
import {getUserRequest} from "../../redux/auth/actions";
import checkTime from "../../checkTime/checkTime";
import {getCommentsRequest} from "../../redux/comment/actions";
import AddComment from "../comment/AddComment";
import Comments from "../comment/Comments";

const {Meta} = Card;
const {Text} = Typography;
const {Content} = Layout;

export default function PostPage() {
   const {
      user
   } = useSelector(state => state.auth);
   const {
      post,
      commentCount
   } = useSelector(state => state.posts);
   const {
      comments
   } = useSelector(state => state.comments);
   const dispatch = useDispatch();
   const [likes, setLike] = useState([]);
   const [allComments, setComment] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const router = useRouter();

   useEffect(() => {
      setComment(comments)
   }, [comments]);

   useEffect(() => {
      setLike(post?.likes);
   }, [post?.likes]);


   useEffect(() => {
      dispatch(getCommentsRequest({postId: post?.id, parentId: null}))
   }, [dispatch, post?.id])

   useEffect(() => {
      if (typeof window !== 'undefined') {
         let token = localStorage.getItem("token");
         if (token && !user) {
            console.log("user")
            dispatch(getUserRequest());
         }
      }
   }, [dispatch, user])

   const showModal = (value) => {
      setIsModalOpen(value);
   };

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

   const goToProfile = () => {
      router.replace(`/user/${post?.owner?.id}`)
   }

   return (
      <Content
         style={contentStyle}
      >
         {
            post ? (
               <>
                  <Card
                     style={{
                        width: "100%",
                        marginTop: "20px",
                        textAlign: "left",
                        padding: "40px 0"
                     }}
                     title={
                        <Space style={{textAlign: "left"}}>
                           <Avatar onClick={goToProfile} style={{cursor: "pointer"}}  size="large" src={`http://localhost:3001/${post?.owner?.avatar}`}/>
                           <div>
                              <Text
                                 onClick={goToProfile}
                                 style={{
                                    display: "block",
                                    fontSize: "18px",
                                    cursor: "pointer"
                                 }}
                              >
                                 {post?.owner?.firstName} {post?.owner?.lastName}
                              </Text>
                              <Text
                                 style={{fontSize: "9px"}}
                              >
                                 {checkTime((new Date() - new Date(post?.createdAt)))}
                              </Text>
                           </div>
                        </Space>
                     }
                     cover={
                        <div
                           style={{display: "flex", justifyContent: "center", overflow: "hidden"}}
                        >
                           <img
                              alt="example"
                              src={`http://localhost:3001/${post?.image}`}
                              style={{maxHeight: "600px"}}
                           />
                        </div>
                     }
                     actions={[
                        <Badge onClick={(e) => {
                           if (e.target.nodeName === "SPAN") {
                              showModal(true);
                           }
                        }} count={likes?.length} key="like" size="middle"
                               offset={[10, 0]} color="#63a4ff">
                           <LikeOutlined onClick={() => {
                              likePost()
                           }
                           } style={{
                              padding: "5px 10px",
                              fontSize: "20px",
                              color: likes?.find(like => like.id === user?.id) ? "rgb(99, 130, 255)" : "gray"
                           }}/>

                        </Badge>,
                        <Badge count={commentCount} key="like" size="middle" offset={[10, 0]} color="#63a4ff">
                           <CommentOutlined style={{fontSize: "20px"}}/>
                        </Badge>,
                     ]}
                  >
                     <Meta
                        title={post?.title}
                        description={post?.content?.length > 30 ? post?.content.slice(0, 30) + "..." : post?.content}
                     />
                  </Card>
                  <Space direction="vertical" style={{background: "white", padding: "10px 20px"}}
                         className="comment-bar">
                     {
                        user ? (
                           <AddComment user={user} parentId={null}/>
                        ) : null
                     }
                     {
                        allComments.map((comment) => {
                           return <Comments key={comment.comment.id} comment={comment} user={user}/>
                        })
                     }
                  </Space>
                  <Modal title="All likes" open={isModalOpen}
                         closeIcon={<CloseOutlined onClick={() => showModal(false)}/>}
                         destroyOnClose={true} footer={null}>
                     {post?.likes?.map(user => (
                        <Card
                           key={user?.id}
                        >
                           <Avatar size="small" src={`http://localhost:3001/${user?.avatar}`}/>
                           <Text style={{marginLeft: "15px"}}>{user?.firstName} {user?.lastName}</Text>
                        </Card>
                     ))}
                  </Modal>
               </>
            ) : (
               <Empty/>
            )
         }

      </Content>
   )
}