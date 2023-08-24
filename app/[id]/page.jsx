import PostPage from "../../components/post/Post";

export const metadata = {
  title: "Post"
}

export default function Post({ params: { id } }) {
  return <PostPage id={ id }/>
}