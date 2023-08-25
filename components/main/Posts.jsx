import {
   Avatar,
   Badge,
   Card,
   Typography,
   Space,
   Button,
   Popover,
   Form,
   Image,
   Modal
} from "antd";
import {
   CommentOutlined,
   DashOutlined,
   DeleteOutlined,
   EditOutlined,
   ExclamationCircleOutlined,
   LikeOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deletePostsRequest, editPostsRequest, likePostsRequest } from "../../redux/post/actions";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import checkTime from "../../checkTime/checkTime";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";

const { confirm } = Modal;
const { Meta } = Card;
const { Text } = Typography;

export default function Posts({post}) {
   const {
      user
   } = useSelector(state => state.auth);
   const dispatch = useDispatch();
   const router = useRouter();
   const [form] = Form.useForm();
   const [likes, setLike] = useState([]);
   const [show, setShow] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);

   useEffect(() => {
      setLike(post.likes);
   }, [post?.likes])


   const likePost = () => {
      if (user?.id) {
         dispatch(likePostsRequest(post.id));
         if (likes.find(elem => elem.id === user?.id)) {
            setLike(likes.filter(elem => elem.id !== user.id));
         } else {
            setLike([...likes, user]);
         }
      } else if (!user) {
         router.replace("/signin");
      }
   };

   const goToProfile = () => {
      window.scrollTo(0, 0);
      router.push(`/user/${post?.owner?.id}`);
   }

   const toggleModal = (show) => {
      setIsModalOpen(show);
   }

   const editPost = () => {
      form
         .validateFields()
         .then((values) => {
            form.resetFields();
            dispatch(editPostsRequest({
               id: post.id,
               data: values
            }));
            return values;
         })
   }

   const showConfirm = () => {
      setShow(false);
      confirm({
         icon: <ExclamationCircleOutlined/>,
         title: "Delete the Post",
         content: "Are you sure to delete this post?",
         okText: "Yes",
         cancelText: "No",
         onOk() {
            dispatch(deletePostsRequest(post.id));
            router.replace("/");
         }
      });
   };

   return (
      <>
         <Card
            style={{
               width: "100%",
               margin: "20px 0",
               textAlign: "left",
            }}
            title={
               <Space style={{textAlign: "left", position: "relative", width: "100%", margin: "10px 0"}}>
                  <Avatar
                     onClick={goToProfile}
                     style={{cursor: "pointer"}}
                     size="large"
                     src={`http://localhost:3001/${post.owner.avatar}`}
                  />
                  <div>
                     <Text
                        onClick={goToProfile}
                        style={{
                           display: "block",
                           fontSize: "18px",
                           cursor: "pointer"
                        }}
                     >
                        {post.owner.firstName} {post.owner.lastName}
                     </Text>
                     <Text style={{fontSize: "9px"}}>{checkTime((new Date() - new Date(post.createdAt)))}</Text>
                  </div>
                  {
                     post?.owner?.id === user?.id ? (
                        <Popover
                           content={<Space direction="vertical">
                              <Button
                                 onClick={() => {
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
                     ) : null
                  }

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
                     color: likes.find(like => like.id === user?.id) ? "rgb(99, 130, 255)" : "gray"
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
         <Modal
            title="Edit Post"
            style={{textAlign: "center"}}
            open={isModalOpen}
            okText="Edit"
            onOk={editPost}
            onCancel={() => toggleModal(false)}>
            <Image
               preview={false}
               alt="image"
               src={`http://localhost:3001/${post.image}`}
               style={{marginBottom: "15px"}}/>
            <Form
               form={form}
               name="form_in_modal"
               layout="vertical"
               initialValues={{
                  title: post?.title,
                  content: post?.content
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
   )
}