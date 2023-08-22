"use client"

import UserMiddleware from "../../middleware/UserMiddleware";

export default function Layout({children}) {
    return <UserMiddleware>
        {children}
    </UserMiddleware>
}