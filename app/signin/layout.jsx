"use client"

import SignMiddleware from "../../middleware/SignMiddleware";

export default function Layout({children}) {
  return <SignMiddleware>
    {children}
  </SignMiddleware>
}