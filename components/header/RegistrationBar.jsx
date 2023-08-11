import {Button, Space} from "antd";
import Link from "next/link";

export default function RegistrationBar() {
  return (
    <Space>
      <Button type="link">Sign In</Button>
      <Link href="/signup">
        <Button type="text">Sign Up</Button>
      </Link>
    </Space>
  )
}