"use client"

import UserPostMiddleware from "../../../../middleware/UserPostMiddleware";

export default function Layout({children}) {
   return <UserPostMiddleware>
      {children}
   </UserPostMiddleware>
}