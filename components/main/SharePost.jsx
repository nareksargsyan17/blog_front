"use client"
import { Avatar, Button, Card, Form, notification, Progress, Space } from "antd";
import { PictureOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getUserRequest } from "../../redux/auth/actions";
import { usePrevious } from "@react-hooks-library/core";
import Modal from "antd/es/modal/Modal";
import Upload from "antd/es/upload/Upload";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import { addPostsRequest } from "../../redux/post/actions";

export default function SharePost({setPosts}) {
   const {
      user,
   } = useSelector(state => state.auth);
   const {
      isAddPostsSuccess,
      addedPost
   } = useSelector(state => state.posts);
   const dispatch = useDispatch();
   const [form] = Form.useForm();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [postValues, setValues] = useState({});
   const [isDone, setDone] = useState(false);
   const prevAddSuccess = usePrevious(isAddPostsSuccess);
   let timer;

   useEffect(() => {
      if (typeof window !== 'undefined') {
         let token = localStorage.getItem("token");
         if (token && !user) {
            dispatch(getUserRequest());
         }
      }
   }, [dispatch, user]);

   useEffect(() => {
      if (isAddPostsSuccess && prevAddSuccess === false) {
         setPosts((oldPosts) => {
            oldPosts.unshift(addedPost);
            return [...oldPosts];
         });
         formRef.current?.resetFields();
         setIsModalOpen(false);
      }
   }, [addedPost, dispatch, isAddPostsSuccess, postValues, prevAddSuccess, setPosts]);

   const toggleModal = (show) => {
      setIsModalOpen(show);
   };

   const beforeUpload = () => {
      setDone(true);
      return false;
   };

   const onSharePost = () => {
      form
         .validateFields()
         .then((values) => {
            form.resetFields();
            let percent = 0;
            const key = 'updatable';
            setValues({...values, image: values.image.file});
            setDone(false);
            timer = setInterval(() => {
               percent++;
               notification.info({
                  key,
                  message: percent === 100 ? "Post is Uploaded" : "Uploading Post...",
                  description: <Progress percent={percent}/>,
                  duration: 3
               });

               if (percent === 100) {
                  clearInterval(timer);
               }
            }, 1);
            const formData = new FormData();
            values.image = values.image.file;
            for (let index in values) {
               formData.append(index, values[index]);
            }
            dispatch(addPostsRequest(formData));
         })
         .catch((info) => {
            console.log('Validate Failed:', info);
         });

   }

   return <Card
      style={{
         width: "100%",
         textAlign: "left",
         height: "120px",
         display: "flex",
         justifyContent: "center",
         flexDirection: "column",
         alignItems: "stretch"
      }}
   >
      <Space
         style={{textAlign: "left", width: "100%", height: "100%"}}
         className="share-post"
      >
         <Avatar
            style={{
               width: "60px",
               height: "60px"
            }}
            src={`http://localhost:3001/${user.avatar}`}
         />
         <Button
            type="text"
            style={{
               borderRadius: "35px",
               width: "100%",
               height: "100%",
               padding: "15px 25px",
               textAlign: "left",
               border: "0.01px solid rgb(191,191,191)",
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center"
            }}
            onClick={() => toggleModal(true)}
         >
            Start a post <PictureOutlined style={{fontSize: "15px", color: "#1677ff"}} />
         </Button>
         <Modal
            title="Share Post"
            style={{textAlign: "center"}}
            okButtonProps={{disabled: !isDone}}
            open={isModalOpen}
            okText="Post"
            onOk={onSharePost}
            onCancel={() => toggleModal(false)}>
            <Form
               form={form}
               name="form_in_modal"
               layout="vertical"
            >
               <Form.Item
                  name="title"
                  label="Title:"
                  rules={[{required: true, message: 'Please Type Post Title'}]}
               >
                  <Input type="text" placeholder="Type post title"/>
               </Form.Item>
               <Form.Item
                  name="content"
                  label="Content:"
                  rules={[{required: true, message: 'Please Type Post Content'}]}
               >
                  <TextArea placeholder="Type post Content"/>
               </Form.Item>
               <Form.Item
                  name="image"
                  label="Image:"
                  valuePropName="image"
                  rules={[{required: true, message: 'Please Type Post Content'}]}
               >
                  <Upload
                     name="avatar"
                     onRemove={() => {
                        setValues({...postValues, image: null});
                        setDone(false);
                     }} maxCount={1} beforeUpload={(e) => beforeUpload(e)} listType="picture-card">
                     {
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
                     }
                  </Upload>
               </Form.Item>
            </Form>
         </Modal>
      </Space></Card>
}