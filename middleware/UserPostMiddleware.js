"use client"
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Content } from "antd/es/layout/layout";
import contentStyle from "../theme/contentStyle";
import { useDispatch, useSelector } from "react-redux";
import { getUserByIdRequest } from "../redux/auth/actions";
import ProfileSkeleton from "../components/cardSkeleton/ProfileSkeleton";

const UserPostMiddleware = ({children}) => {
   const router = useRouter();
   const {
      isGetUserByIdSuccess,
      isGetUserByIdFailure
   } = useSelector(state => state.auth)
   const dispatch = useDispatch();
   const pathName = usePathname();

   useEffect(() => {
      dispatch(getUserByIdRequest(pathName.split("/")[2]));
   }, [dispatch, pathName]);

   if (isGetUserByIdFailure) {
      return router.back();
   } else if (isGetUserByIdSuccess) {
      return children;
   } else {
      return (
         <Content style={contentStyle}>
            <ProfileSkeleton/>
         </Content>
      );
   }
};

export default UserPostMiddleware;