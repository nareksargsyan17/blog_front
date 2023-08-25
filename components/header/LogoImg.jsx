import { Image } from "antd";
import Link from "next/link";

export default function LogoImg() {

  return <Link href="/">
    <Image src="http://localhost:3000/logo.png" preview={false} width={50} style={{cursor: "pointer"}} alt="img"/>
  </Link>
}