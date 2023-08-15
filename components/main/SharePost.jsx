"use client"
import {Avatar, Button, Card, Form, notification, Progress, Space} from "antd";
import {AreaChartOutlined, PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getUserRequest} from "../../redux/auth/actions";
import {usePrevious} from "@react-hooks-library/core";
import Modal from "antd/es/modal/Modal";
import Upload from "antd/es/upload/Upload";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import {addPostsRequest, uploadPostImageRequest} from "../../redux/post/actions";

export default function SharePost({setPosts}) {
  const {
    user,
    isGetUserRequest,
    isGetUserSuccess,
    isGetUserFailure,
  } = useSelector(state => state.auth);
  const {
    isAddPostsRequest,
    isAddPostsSuccess,
    isAddPostsFailure,
    isUploadPostImageRequest,
    isUploadPostImageSuccess,
    isUploadPostImageFailure,
    addedPost
  } = useSelector(state => state.posts)
  const dispatch = useDispatch();
  const prevAddSuccess = usePrevious(isAddPostsSuccess);
  const prevUploadPostSuccess = usePrevious(isUploadPostImageSuccess);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postValues, setValues] = useState({});
  const [isDone, setDone] = useState("fail");
  const formRef = React.useRef(null);
  let timer;
  
  useEffect(() => {
    dispatch(getUserRequest())
  }, [dispatch])

  useEffect(() => {
    if (isAddPostsSuccess && prevAddSuccess === false) {
      const formData = new FormData();
      formData.append("image", postValues.image)
      dispatch(uploadPostImageRequest({id: addedPost.id, formData}))
    }
  }, [addedPost.id, dispatch, isAddPostsSuccess, postValues.image, prevAddSuccess])

  useEffect(() => {
    if (isUploadPostImageSuccess && prevUploadPostSuccess === false) {
      setPosts((oldPosts) => {
        oldPosts.unshift(addedPost);
        return [...oldPosts];
      });
      formRef.current?.resetFields();
      setIsModalOpen(false);
    }
  }, [addedPost, isUploadPostImageSuccess, prevUploadPostSuccess, setPosts, timer])

  const toggleModal = (show) => {
    setIsModalOpen(show);
  }

  const beforeUpload = (file) => {
    setDone("pending");
    return false;
  };

  const onFinish = (values) => {
    setValues({...values, image: values.image.file});
    setDone("ok");
  }

  const onSharePost = () => {
    let percent = 0;
    const key = 'updatable';
    timer = setInterval(() => {
      percent++;
      notification.info({
        key,
        message: percent === 100 ? "Post is Uploaded" : "Uploading Post...",
        description: <Progress percent={percent} />,
        duration: 3
      });

      if (percent === 100) {
        clearInterval(timer);
      }
    }, 1);
    dispatch(addPostsRequest({title: postValues.title, content: postValues.content}));
  }

  return <Card style={{
    width: "100%",
    margin: "20px 0",
    textAlign: "left"
  }}>
    <Space style={{textAlign: "left", width: "100%", height: "100%"}} className="share-post">
      <Avatar size="large"
              src={user?.images ? `http://localhost:3001/${user.images.path}` : `https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg`}/>
      <Button style={{borderRadius: "15px"}} onClick={() => toggleModal(true)}>Start a post <AreaChartOutlined
        style={{fontSize: "15px", color: "#1677ff"}}/></Button>
      <Modal title="Share Post" style={{textAlign: "center"}} okButtonProps={{disabled: isDone !== "ok"}} open={isModalOpen} onOk={onSharePost} onCancel={() => toggleModal(false)}>
        <Form
          onFinish={onFinish}
          layout="vertical"
          ref={formRef}
        >
          <Form.Item
            name="title"
            label="Title:"
            rules={[{required: true, message: 'Please Type Post Title'}]}
          >
            <Input disabled={isDone === "ok"} type="text" placeholder="Type post title"/>
          </Form.Item>
          <Form.Item
            name="content"
            label="Content:"
            rules={[{required: true, message: 'Please Type Post Content'}]}
          >
            <TextArea disabled={isDone === "ok"} placeholder="Type post Content"/>
          </Form.Item>
          <Form.Item
            name="image"
            label="Image:"
            valuePropName="image"
            rules={[{required: true, message: 'Please Type Post Content'}]}
          >
            <Upload onRemove={(file) => {
              setValues({...postValues, image: null});
              setDone("fail");
            }} maxCount={1} beforeUpload={(e) => beforeUpload(e)} listType="picture-card">
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
            </Upload>
          </Form.Item>
          <Form.Item style={{width: "100%"}}>
            <Button disabled={isDone !== "pending"} style={{width: "100%"}} loading={false} type="primary" htmlType="submit">
              Done
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Space></Card>
}