import {Card, Skeleton, Space} from "antd";
import React from "react";

export default function CardSkeleton() {
   return (
      <Card
         style={{
            width: "100%",
            margin: "20px 0",
            textAlign: "left",
         }}
         title={
            <Space style={{textAlign: "left", position: "relative", width: "100%", margin: "10px 0"}}>
               <Skeleton.Avatar active />
               <div
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     gap: "5px"
                  }}
               >
                  <Skeleton.Input
                     active
                     block
                     size="small"
                  />
                  <Skeleton.Input
                     active
                     block
                     size="small"
                  />
               </div>

            </Space>
         }
         cover={
            <div
               style={{display: "flex", justifyContent: "center", overflow: "hidden", cursor: "pointer"}}
            >
               <Skeleton.Image
                  active
                  style={{
                     width: "600px",
                     height: "400px"
                  }}
               />
            </div>
         }
         actions={[
            <Skeleton.Button key={1} active/>,
            <Skeleton.Button key={2} active/>
         ]}
      >
         <Skeleton active title paragraph={{
            rows: 1
         }}/>
      </Card>
   )
}