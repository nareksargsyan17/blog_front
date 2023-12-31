'use client'
import { useDispatch, useSelector } from "react-redux";
import { getPostByIdRequest } from "../redux/post/actions";
import { useEffect } from "react";
import contentStyle from "../theme/contentStyle";
import { Content } from "antd/es/layout/layout";
import CardSkeleton from "../components/cardSkeleton/CardSkeleton";

const PostMiddleWare = ({children}) => {
   const {
      isGetPostByIdFailure,
      post
   } = useSelector(state => state.posts);
   const dispatch = useDispatch();

   useEffect(() => {
      console.log(children)
      dispatch(getPostByIdRequest(children.props.childProp.current[1].props.id));
   }, [children, dispatch]);

   if (post != null) {
      return children;
   } else if (isGetPostByIdFailure) {
      throw new Error("");
   } else {
      return (
         <Content style={contentStyle}>
            <CardSkeleton/>
         </Content>
      );
   }
};

export default PostMiddleWare;