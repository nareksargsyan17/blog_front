"use client"
import {Button, Space, Spin} from "antd";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons";
import {changeUserData, getUserRequest, logged} from "../../redux/auth/actions";

export default function RegistrationBar() {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [token, setToken] = useState("");

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
          <Link href="/">
            <Button type="link" onClick={() => {
              localStorage.removeItem("token");
              setToken(null);
              dispatch(changeUserData(null));
            }}>Sign Out</Button>
          </Link>) : (
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