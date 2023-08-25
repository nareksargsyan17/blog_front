"use client"
import { Content } from "antd/es/layout/layout";
import contentStyle from "../../theme/contentStyle";
import { Avatar, Empty, Form, notification, Progress, Space, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getUserPostsRequest } from "../../redux/post/actions";
import Posts from "../main/Posts";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {changeUserData, editUserRequest, getUserByIdRequest, getUserRequest} from "../../redux/auth/actions";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import Upload from "antd/es/upload/Upload";
import Modal from "antd/es/modal/Modal";
import { usePrevious } from "@react-hooks-library/core";
import InfiniteScroll from "react-infinite-scroll-component";

const { Text } = Typography;

export default function Profile({ id }) {
   const {
      isGetUserPostsSuccess,
      isEditPostsSuccess,
      updatedPost,
      userPosts
   } = useSelector(state => state.posts);
   const {
      gottenUser,
      user,
      isGetUserByIdSuccess,
      isEditUserSuccess,
      updated
   } = useSelector(state => state.auth);
   const dispatch = useDispatch();
   const [form] = Form.useForm();
   const router = useRouter();

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [userValues, setValues] = useState(gottenUser);
   const [posts, setPosts] = useState([]);
   const [isDone, setDone] = useState(true);
   const [page, setPage] = useState(1);

   const prevEditSuccess = usePrevious(isEditUserSuccess);
   const prevGetSuccess = usePrevious(isGetUserByIdSuccess);
   const prevEditPostsSuccess = usePrevious(isEditPostsSuccess);
   const prevGetPostsSuccess = usePrevious(isGetUserPostsSuccess);
   let timer;

   useEffect(() => {
      if (!user) {
         dispatch(getUserRequest());
      }
   }, [dispatch, user]);

   useEffect(() => {
      if (!gottenUser) {
         dispatch(getUserByIdRequest(id));
      }
   }, [dispatch, gottenUser, id]);

   useEffect(() => {
      dispatch(getUserPostsRequest({
         id,
         page,
      }))
   }, [dispatch, id]);

   useEffect(() => {
      if (isGetUserPostsSuccess && prevGetPostsSuccess === false) {
         setPosts([...posts, ...userPosts]);
         setPage(page + 1);
      }
   }, [isGetUserPostsSuccess, page, posts, prevGetPostsSuccess, userPosts]);

   useEffect(() => {
      if (isGetUserByIdSuccess && prevGetSuccess === false) {
         setValues(gottenUser);
      }
   }, [gottenUser, isGetUserByIdSuccess, prevGetSuccess, userValues]);

   useEffect(() => {
      if (isEditUserSuccess && prevEditSuccess === false) {
         window.location.reload();
      }
   }, [dispatch, isEditUserSuccess, prevEditSuccess, router, updated]);

   useEffect(() => {
      if (isEditPostsSuccess && prevEditPostsSuccess === false) {
         notification["success"]({
            duration: 3,
            description: "Post was Updated"
         });
         router.replace(`/${updatedPost.id}`);
         setPosts((prevValues) => {
            return prevValues.map((post) => {
               if (post.id === updatedPost.id) {
                  return {...post, ...updatedPost};
               }
               return post;
            });
         })
         dispatch(changeUserData(updated));
         dispatch(getUserRequest());
      }
   }, [dispatch, isEditPostsSuccess, prevEditPostsSuccess, router, updated, updatedPost]);

   const getData = () => {
      dispatch(getUserPostsRequest({
         id,
         page
      }))
   };

   const toggleModal = (show) => {
      setIsModalOpen(show);
   };

   const beforeUpload = () => {
      setDone(true);
      return false;
   };

   const onEditProfile = () => {
      form
         .validateFields()
         .then((values) => {
            form.resetFields();
            let percent = 0;
            const key = 'updatable';
            setDone(true);
            timer = setInterval(() => {
               percent++;
               notification.info({
                  key,
                  message: percent === 100 ? "Profile is Updated" : "Updating Profile...",
                  description: <Progress percent={percent}/>,
                  duration: 3
               });

               if (percent === 100) {
                  clearInterval(timer);
               }
            }, 1);
            const formData = new FormData();
            if (values.avatar) {
               values.avatar = values.avatar.file;
            }

            for (let index in values) {
               formData.append(index, values[index]);
            }
            dispatch(editUserRequest(formData));
         })
   };

   return (
      <Content style={contentStyle}>
         {
            <>
               <Space style={{background: "white", padding: "0 15px", position: "relative"}}>
                  <Avatar
                     alt="avatar"
                     size={{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 64,
                        xl: 80,
                        xxl: 100,
                     }}
                     src={`http://localhost:3001/${userValues?.avatar}`}
                  />
                  <Text
                     style={{
                        display: "block",
                        fontSize: "20px"
                     }}
                  >
                     {userValues?.firstName} {userValues?.lastName}
                  </Text>
                  {
                     user?.id === gottenUser?.id ? (
                        <EditOutlined
                           style={{
                              position: "absolute",
                              right: "15px",
                              top: "15px",
                              cursor: "pointer",
                              fontSize: "25px"
                           }}
                           onClick={() => setIsModalOpen(true)}
                        />
                     ) : null
                  }
               </Space>
               {
                  posts?.length > 0 ? (
                     <InfiniteScroll
                        next={getData}
                        hasMore={userPosts.length === 10}
                        loader={<Spin/>}
                        dataLength={posts.length}
                        endMessage={<p>No more data to load.</p>}
                     >
                        {
                           posts.map(post => <Posts key={post.id} post={post}/>)
                        }
                     </InfiniteScroll>) : (
                     <Empty description="There are no shared posts"/>)
               }
               <Modal
                  title="Edit Profile"
                  style={{textAlign: "center", width: "800px"}}
                  open={isModalOpen}
                  okText="Post"
                  onOk={onEditProfile}
                  onCancel={() => toggleModal(false)}>
                  <Form
                     form={form}
                     name="form_in_modal"
                     layout="vertical"
                     initialValues={{
                        firstName: userValues?.firstName,
                        lastName: userValues?.lastName,
                     }}
                  >
                     <Form.Item
                        name="firstName"
                        label="First Name:"
                        rules={[{required: true, message: 'Please Type Your First Name'}]}
                     >
                        <Input type="text" placeholder="Type Your First Name"/>
                     </Form.Item>
                     <Form.Item
                        name="lastName"
                        label="Last Name:"
                        rules={[{required: true, message: 'Please Type Your Last Name'}]}
                     >
                        <TextArea placeholder="Type Your Last Name"/>
                     </Form.Item>
                     <Form.Item
                        name="avatar"
                        label="Avatar:"
                        valuePropName="avatar"
                     >
                        <Upload
                           name="avatar"
                           onRemove={() => {
                              setValues({...userValues});
                              setDone(false);
                           }}
                           maxCount={1}
                           beforeUpload={(e) => beforeUpload(e)}
                           listType="picture-card"
                           defaultFileList={[
                              {
                                 uid: '1',
                                 name: 'xxx.png',
                                 status: 'done',
                                 url: `http://localhost:3001/${userValues?.avatar}`,
                              }
                           ]}
                        >
                           {
                              (
                                 !isDone ? (
                                    <div>
                                       <PlusOutlined/>
                                       <div
                                          style={{
                                             marginTop: 8,
                                          }}
                                       >
                                          Upload
                                       </div>
                                    </div>
                                 ) : null
                              )
                           }
                        </Upload>
                     </Form.Item>
                  </Form>
               </Modal>
            </>
         }
      </Content>
   )
}