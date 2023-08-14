"use client"

import Middleware from "../../middleware/Middleware";

export default function Layout({children}) {
  return <Middleware>
    {children}
  </Middleware>
}