"use client"
import { useRouter } from "next/navigation";
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

   useEffect(() => {
      dispatch(getUserByIdRequest(children.props.childProp.current[1].props.id));
   }, [children, dispatch]);

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