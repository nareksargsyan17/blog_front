"use client"

import UserMiddleware from "../../../middleware/UserMiddleware";
import UserPostMiddleware from "../../../middleware/UserPostMiddleware";

export default function Layout({children}) {
   return <UserPostMiddleware>
      {children}
   </UserPostMiddleware>
}