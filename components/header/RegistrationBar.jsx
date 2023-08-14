"use client"
import { Button, Space } from "antd";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function RegistrationBar() {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined'  && window.localStorage) {
      let token = localStorage.getItem("token");
      setToken(token)
    }
  }, [])


  return (
    <Space>
      {token ? (
          <Link href="/">
            <Button type="link">Sign Out</Button>
          </Link>
      ) : (
        <>
          <Link href="/signin">
            <Button type="link">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button type="text">Sign Up</Button>
          </Link>
        </>
      )
      }
    </Space>
  )
}