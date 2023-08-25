import PostMiddleware from "../../../middleware/PostMiddleware";

export default function Layout({children}) {
  return <PostMiddleware>
    {children}
  </PostMiddleware>
}