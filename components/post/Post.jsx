"use client"
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deletePostsRequest, editPostsRequest, getPostByIdRequest, likePostsRequest } from "../../redux/post/actions";
import {
   Avatar,
   Badge,
   Card,
   Layout,
   Space,
   Typography,
   Modal,
   Button,
   Popover,
   Form,
   Image,
   notification
} from "antd";
import {
   CloseOutlined,
   CommentOutlined,
   DashOutlined,
   DeleteOutlined,
   EditOutlined,
   ExclamationCircleOutlined,
   LikeOutlined,
} from "@ant-design/icons";
import contentStyle from "../../theme/contentStyle";
import { getUserRequest } from "../../redux/auth/actions";
import checkTime from "../../checkTime/checkTime";
import { getCommentsRequest } from "../../redux/comment/actions";
import AddComment from "../comment/AddComment";
import Comments from "../comment/Comments";
import { usePrevious } from "@react-hooks-library/core";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import CardSkeleton from "../cardSkeleton/CardSkeleton";

const { confirm } = Modal;
const { Meta } = Card;
const { Text } = Typography;
const { Content } = Layout;

export default function PostPage({ id }) {
   const {
      user
   } = useSelector(state => state.auth);
   const {
      post,
      commentCount,
      isEditPostsSuccess,
      updatedPost,
      isDeletePostsSuccess,
      isGetPostByIdSuccess
   } = useSelector(state => state.posts);
   const {
      isGetCommentsSuccess,
      comments
   } = useSelector(state => state.comments);
   const dispatch = useDispatch();
   const router = useRouter();
   const [likes, setLike] = useState([]);
   const [allComments, setComment] = useState([]);
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [show, setShow] = useState(false);
   const [currPost, setPost] = useState(post);
   const [form] = Form.useForm();
   const prevGetCommentSuccess = usePrevious(isGetCommentsSuccess);
   const prevEditPostsSuccess = usePrevious(isEditPostsSuccess);
   const prevGetPostSuccess = usePrevious(isGetPostByIdSuccess);
   const prevDeleteSuccess = usePrevious(isDeletePostsSuccess);


   useEffect(() => {
      dispatch(getPostByIdRequest(id));
   }, [dispatch, id]);

   useEffect(() => {
      if (isGetPostByIdSuccess && prevGetPostSuccess === false && post) {
         setPost(post)
         setLike(post.likes);
         dispatch(getCommentsRequest({postId: post?.id, parentId: null}))
      }
   }, [dispatch, isGetPostByIdSuccess, post, prevGetPostSuccess]);


   useEffect(() => {
      if (isGetCommentsSuccess && prevGetCommentSuccess === false) {
         setComment(comments);
      }
   }, [comments, isGetCommentsSuccess, prevGetCommentSuccess]);

   useEffect(() => {
      if (typeof window !== 'undefined') {
         let token = localStorage.getItem("token");
         if (token && !user) {
            dispatch(getUserRequest());
         }
      }
   }, [dispatch, user]);

   useEffect(() => {
      if (isEditPostsSuccess && prevEditPostsSuccess === false) {
         router.replace(`/${updatedPost.id}`);
         setPost({...currPost, ...updatedPost});
         toggleModal(false);
         notification["success"]({
            duration: 3,
            description: "Post was Updated"
         });
      }
   }, [currPost, isEditPostsSuccess, prevEditPostsSuccess, router, updatedPost]);

   useEffect(() => {
      if (isDeletePostsSuccess && prevDeleteSuccess === false) {
         router.replace("/");
      }
   }, [isDeletePostsSuccess, prevDeleteSuccess, router]);

   const showModal = (value) => {
      setIsModalOpen(value);
   };

   const likePost = () => {
      if (user?.id) {
         dispatch(likePostsRequest(currPost.id));
         if (likes.find(elem => elem.id === user?.id)) {
            setLike(likes.filter(elem => elem.id !== user.id));
         } else {
            setLike([...likes, user]);
         }
      } else {
         router.replace("/signin");
      }
   };

   const goToProfile = () => {
      router.replace(`/user/${currPost?.owner?.id}`);
   };


   const toggleModal = (show) => {
      setIsEditModalOpen(show);
   };

   const editPost = () => {
      form
         .validateFields()
         .then((values) => {
            form.resetFields();
            dispatch(editPostsRequest({
               id: currPost.id,
               data: values
            }))
            return values;
         })
   };

   const showConfirm = () => {
      setShow(false);
      confirm({
         icon: <ExclamationCircleOutlined/>,
         title: "Delete the Post",
         content: "Are you sure to delete this post?",
         okText: "Yes",
         cancelText: "No",
         onOk() {
            dispatch(deletePostsRequest(currPost.id));
            router.replace("/");
         }
      });
   };

   return (
      <Content
         style={contentStyle}
      >
         {
            isGetPostByIdSuccess ? (
               <>
                  <Card
                     style={{
                        width: "100%",
                        marginTop: "20px",
                        textAlign: "left",
                     }}
                     title={
                        <Space style={{textAlign: "left", margin: "10px 0"}}>
                           <Avatar onClick={goToProfile} style={{cursor: "pointer"}} size="large"
                                   src={`http://localhost:3001/${currPost?.owner?.avatar}`}/>
                           <div>
                              <Text
                                 onClick={goToProfile}
                                 style={{
                                    display: "block",
                                    fontSize: "18px",
                                    cursor: "pointer"
                                 }}
                              >
                                 {currPost?.owner?.firstName} {currPost?.owner?.lastName}
                              </Text>
                              <Text
                                 style={{fontSize: "9px"}}
                              >
                                 {checkTime((new Date() - new Date(currPost?.createdAt)))}
                              </Text>
                           </div>
                           <Popover
                              content={<Space direction="vertical">
                                 <Button
                                    onClick={() => {
                                       setShow(false);
                                       toggleModal(true)
                                    }}
                                    size="small"
                                    style={{
                                       width: "200px",
                                       display: "flex",
                                       justifyContent: "left",
                                       alignItems: "center",
                                       padding: "20px"
                                    }}
                                 >
                                    <EditOutlined/>
                                    <Text style={{marginLeft: "20px"}}>Edit</Text>
                                 </Button>
                                 <Button
                                    onClick={showConfirm}
                                    size="small"
                                    style={{
                                       width: "200px",
                                       display: "flex",
                                       justifyContent: "left",
                                       alignItems: "center",
                                       padding: "20px"
                                    }}
                                 >
                                    <DeleteOutlined/>
                                    <Text style={{marginLeft: "20px"}}>Delete</Text>
                                 </Button>
                              </Space>}
                              trigger="click"
                              open={show}
                              onOpenChange={() => setShow(!show)}
                           >
                              <Button
                                 type="text"
                                 style={{
                                    position: "absolute",
                                    right: "0",
                                    top: "10px",
                                    cursor: "pointer",
                                    borderRadius: "50%",
                                    height: "40px"
                                 }}
                              >
                                 <DashOutlined/>
                              </Button>
                           </Popover>
                        </Space>
                     }
                     cover={
                        <div
                           style={{display: "flex", justifyContent: "center", overflow: "hidden"}}
                        >
                           <img
                              alt="example"
                              src={`http://localhost:3001/${currPost?.image}`}
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
                        title={currPost?.title}
                        description={currPost?.content?.length > 30 ? currPost?.content.slice(0, 30) + "..." : currPost?.content}
                     />
                  </Card>
                  <Space direction="vertical" style={{background: "white", padding: "10px 20px"}}
                         className="comment-bar">
                     {
                        user ? (
                           <AddComment user={user} parentId={null} setComment={setComment}/>
                        ) : null
                     }
                     {
                        allComments?.map((comment) => {
                           return <Comments key={comment.comment.id} comment={comment} user={user}/>
                        })
                     }
                  </Space>
                  <Modal title="All likes" open={isModalOpen}
                         closeIcon={<CloseOutlined onClick={() => showModal(false)}/>}
                         onCancel={() => showModal(false)}
                         destroyOnClose={true} footer={null}>
                     {likes.map(user => (
                        <Card
                           key={user?.id}
                        >
                           <Avatar size="small" src={`http://localhost:3001/${user?.avatar}`}/>
                           <Text style={{marginLeft: "15px"}}>{user?.firstName} {user?.lastName}</Text>
                        </Card>
                     ))}
                  </Modal>
                  <Modal
                     title="Edit Post"
                     style={{textAlign: "center"}}
                     open={isEditModalOpen}
                     okText="Edit"
                     onOk={editPost}
                     onCancel={() => toggleModal(false)}>
                     <Image
                        preview={false}
                        alt="image"
                        src={`http://localhost:3001/${currPost.image}`}
                        style={{marginBottom: "15px"}}/>
                     <Form
                        form={form}
                        name="form_in_modal"
                        layout="vertical"
                        initialValues={{
                           title: currPost?.title,
                           content: currPost?.content
                        }}
                     >
                        <Form.Item
                           name="title"
                           label="Title:"
                           rules={[{required: true, message: 'Please Type Your Post Title'}]}
                        >
                           <Input type="text" placeholder="Type Your Post Title"/>
                        </Form.Item>
                        <Form.Item
                           name="content"
                           label="Post Content:"
                           rules={[{required: true, message: 'Please Type Your Post Content'}]}
                        >
                           <TextArea placeholder="Type Your Post Content"/>
                        </Form.Item>
                     </Form>
                  </Modal>
               </>
            ) : (
               <CardSkeleton />
            )
         }

      </Content>
   )
}