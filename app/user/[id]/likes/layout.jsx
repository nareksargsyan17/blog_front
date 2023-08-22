"use client"
import UserLikedPostMiddleware from "../../../../middleware/UserLikedPostsMiddleware";

export default function Layout({children}) {
   return <UserLikedPostMiddleware>
      {children}
   </UserLikedPostMiddleware>
}