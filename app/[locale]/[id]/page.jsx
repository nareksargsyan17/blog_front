import PostPage from "../../../components/post/Post";

export async function generateMetadata({ params: { id } }) {

  const post = await fetch(`http://localhost:3001/api/guest/post/get/${id}`).then((res) => res.json())

  return {
    title: `Post | ${post.data.title}`,
    description: post.data.content
  }
}



export default function Post({ params: { id } }) {
  return <PostPage id={ id }/>
}