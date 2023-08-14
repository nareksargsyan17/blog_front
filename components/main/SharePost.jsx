"use client"
import {Avatar, Button, Card, Form, Space} from "antd";
import {AreaChartOutlined, PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getUserRequest} from "../../redux/auth/actions";
import {usePrevious} from "@react-hooks-library/core";
import Modal from "antd/es/modal/Modal";
import Upload from "antd/es/upload/Upload";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";

export default function SharePost() {
  const {
    user,
    isGetUserRequest,
    isGetUserSuccess,
    isGetUserFailure,
  } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const prevGetSuccess = usePrevious(isGetUserSuccess);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postImage, setPostImage] = useState()

  useEffect(() => {
    dispatch(getUserRequest())
  }, [dispatch])


  useEffect(() => {
    if (isGetUserSuccess && prevGetSuccess === false) {
      console.log(user)
    }
  })

  console.log("postImage------------", postImage)
  const toggleModal = (show) => {
    setIsModalOpen(show)
  }

  const beforeUpload = (file) => {
    setPostImage(file);

    return false;
  };

  const onFinish = (values) => {
    console.log(postImage)
    console.log(values)
  }

  return <Card style={{
    width: "100%",
    margin: "20px 0",
    textAlign: "left"
  }}>
    <Space style={{textAlign: "left", width: "100%", height: "100%"}} className="share-post">
      <Avatar size="large" src={user?.images ? `http://localhost:3001/${user.images.path}` : `https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg`} />
      <Button style={{borderRadius: "15px"}} onClick={() => toggleModal(true)}>Start a post <AreaChartOutlined style={{fontSize: "15px", color: "#1677ff"}}/></Button>
      <Modal title="Share Post" style={{textAlign: "center"}} open={isModalOpen} onCancel={() => toggleModal(false)}>
        <Form
          onFinish={onFinish}
        layout="vertical">
          <Form.Item
            name="title"
            label="Title:"
            rules={[{ required: true, message: 'Please Type Post Title' }]}
          >
            <Input type="text" placeholder="Type post title"/>
          </Form.Item>
          <Form.Item
            name="content"
            label="Content:"
            rules={[{ required: true, message: 'Please Type Post Content' }]}
          >
            <TextArea placeholder="Type post Content"/>
          </Form.Item>
          <Form.Item
            name="image"
            label="Image:"
            valuePropName="image"
            rules={[{ required: true, message: 'Please Type Post Content', type: "object"}]}
          >
            <Upload onRemove={() => setPostImage(null)} maxCount={1} beforeUpload={(e) => beforeUpload(e)} listType="picture-card">
              <div>
                <PlusOutlined />
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
            <Button style={{width: "100%"}} loading={false} type="primary" htmlType="submit">
              Done
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Space></Card>
}