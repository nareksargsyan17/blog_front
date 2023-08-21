import {Avatar, Button, Space, Typography} from "antd";
import checkTime from "../../checkTime/checkTime";
import AddComment from "./AddComment";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {usePrevious} from "@react-hooks-library/core";
import {log} from "next/dist/server/typescript/utils";

const {Text} = Typography;

export default function Comments({comment, user}) {
    const [active, setActive] = useState(false);
    const [showAnswers, setShow] = useState(null);
    const [answers, setAnswers] = useState(comment?.answers);

    console.log(answers)
    return <Space style={{width: "100%", display: "flex", justifyContent: "left", alignItems: "start"}}
                  className="share-comment">
        <Space style={{display: "flex", justifyContent: "start"}}>
            <Avatar size="large"
                    src={`http://localhost:3001/${comment?.comment?.owner?.avatar}`}
            />
        </Space>
        <Space direction="vertical" style={{width: "100%"}}>
            <Space className="comments" style={{
                display: "block",
                textAlign: 'left',
                background: "rgb(242,242,242)",
                width: "100%",
                borderRadius: "0 10px 10px 10px",
                padding: "10px"
            }}>
                <Space wrap style={{display: "flex", justifyContent: "space-between"}}>
                    <Text style={{
                        display: "block",
                        fontWeight: "bold"
                    }}>{comment?.comment?.owner?.firstName} {comment?.comment?.owner?.lastName}</Text>
                    <Text style={{
                        display: "block",
                        fontWeight: "50",
                        fontSize: "12px"
                    }}>  {checkTime((new Date() - new Date(comment?.comment?.createdAt)))}</Text>
                </Space>
                <Text style={{display: "block", marginTop: "10px"}}>{comment?.comment?.comment}</Text>
                <Space className="comments" style={{textAlign: "right", width: "100%"}}>
                    {
                        answers?.length > 0 ?
                            <Button type="link"
                                    onClick={() => setShow(!showAnswers)}>{showAnswers ? "Hide" : "Show"} {answers?.length} answers</Button> : null
                    }
                    {
                        user ? <Button type="link" onClick={() => setActive(!active)}>Reply</Button> : null
                    }
                </Space>
            </Space>
            {
                active ? <AddComment user={user} parentId={comment.comment.id} setAnswers={setAnswers}/> : null
            }
            {
                answers?.filter(comment => {
                    if (showAnswers === null ) {
                        return comment.userId === user?.id
                    } else return showAnswers;
                }).map(answer => (
                    <Space key={answer?.id}
                           style={{width: "100%", display: "flex", justifyContent: "left", alignItems: "start"}}
                           className="share-comment">
                        <Space style={{display: "flex", justifyContent: "start"}}>
                            <Avatar size="large"
                                    src={`http://localhost:3001/${answer?.owner?.avatar}`}
                            />
                        </Space>
                        <Space direction="vertical" style={{width: "100%"}}>
                            <Space className="comments" style={{
                                display: "block",
                                textAlign: 'left',
                                background: "rgb(242,242,242)",
                                width: "100%",
                                borderRadius: "0 10px 10px 10px",
                                padding: "10px"
                            }}>
                                <Space wrap style={{display: "flex", justifyContent: "space-between"}}>
                                    <Text style={{
                                        display: "block",
                                        fontWeight: "bold"
                                    }}>{answer?.owner?.firstName} {answer?.owner?.lastName}</Text>
                                    <Text style={{
                                        display: "block",
                                        fontWeight: "50",
                                        fontSize: "12px"
                                    }}>  {checkTime((new Date() - new Date(answer.createdAt)))}</Text>
                                </Space>
                                <Text style={{display: "block", marginTop: "10px"}}>{answer.comment}</Text>
                                <Space className="comments" style={{textAlign: "right", width: "100%"}}>
                                </Space>
                            </Space>
                        </Space>
                    </Space>
                ))
            }
        </Space>
    </Space>
}