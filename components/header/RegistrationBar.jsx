"use client"
import {Button, Card, Image, Popover, Space, Spin, Avatar, Typography} from "antd";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LoadingOutlined, LogoutOutlined} from "@ant-design/icons";
import {changeUserData} from "../../redux/auth/actions";
const { Text } = Typography;

export default function RegistrationBar() {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let token = localStorage.getItem("token");
      setToken(token);
      if (!token) {
        dispatch(changeUserData(null))
      }
    }
  }, [token, user, dispatch]);

  return (
    <Space>
      {token === "" ? (
        <Spin indicator={<LoadingOutlined
          style={{
            fontSize: 24,
          }}
          spin
        />}
        />
      ) : (
        token?.length > 0 ? (
            <>
              <Popover
                  content={
                    <Space direction="vertical">
                      <Button onClick={() => {
                        localStorage.removeItem("token");
                        setToken(null);
                        dispatch(changeUserData(null));
                      }} size="small" style={{width: "200px", display: "flex", justifyContent: "left", alignItems: "center", padding: "20px"}}>
                        <LogoutOutlined />
                        <Text style={{marginLeft: "20px"}}>Sign Out</Text>
                      </Button>
                      <Button onClick={() => {
                        localStorage.removeItem("token");
                        setToken(null);
                        dispatch(changeUserData(null));
                      }} size="small" style={{width: "200px", display: "flex", justifyContent: "left", alignItems: "center", padding: "20px"}}>
                        <LogoutOutlined />
                        <Text style={{marginLeft: "20px"}}>Sign Out</Text>
                      </Button>
                    </Space>

                  }
                  trigger="click"
                  open={show}
                  onOpenChange={() => setShow(!show)}
              >
                <Avatar src={`http://localhost:3001/${user?.avatar}`} alt="img" style={{cursor: "pointer"}}/>
              </Popover>
            </>
          ) : (
          <>
            <Link href="/signin">
              <Button type="link">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button type="text">Sign Up</Button>
            </Link>
          </>
        ))
      }
    </Space>
  )
}