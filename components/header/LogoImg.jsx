import {Image} from "antd";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {getPostsRequest} from "../../redux/post/actions";

export default function LogoImg() {
  const dispatch = useDispatch();

  return <Link href="/" onClick={() => dispatch(getPostsRequest(1))}>
    <Image src="http://localhost:3000/logo.png" preview={false} width={50} style={{cursor: "pointer"}}/>
  </Link>
}