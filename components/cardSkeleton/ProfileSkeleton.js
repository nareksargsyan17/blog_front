import { Skeleton, Space } from "antd";
import React from "react";

export default function ProfileSkeleton() {
   return (
      <Space style={{background: "white", padding: "0 15px", position: "relative", display: "flex"}}>
         <Skeleton.Avatar active size="large" style={{width: "100px", height: "100px", marginTop: "15px"}}/>
         <Skeleton.Input active style={{marginTop: "50px"}} size="small"/>
         <Skeleton.Avatar
            style={{
               position: "absolute",
               right: "15px",
               top: "15px",
               cursor: "pointer",
               fontSize: "25px"
            }}
         />
      </Space>
   )
}