"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Content } from "antd/es/layout/layout";
import contentStyle from "../theme/contentStyle";
import { useDispatch, useSelector } from "react-redux";
import { getUserRequest } from "../redux/auth/actions";
import CardSkeleton from "../components/cardSkeleton/CardSkeleton";

const UserLikedPostMiddleware = ({children}) => {
   const router = useRouter();
   const {
      isGetUserSuccess,
      isGetUserFailure,
      user
   } = useSelector(state => state.auth)
   const dispatch = useDispatch();

   useEffect(() => {
      if (!user) {
         dispatch(getUserRequest());
      }
   }, [dispatch, user]);

   if (isGetUserFailure) {
      return router.back();
   } else if (isGetUserSuccess || user) {
      return children;
   } else {
      return (
         <Content style={contentStyle}>
            <CardSkeleton />
         </Content>
      );
   }
};

export default UserLikedPostMiddleware;