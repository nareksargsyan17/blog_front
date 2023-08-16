import {Avatar, Button, Space, Typography} from "antd";
import checkTime from "../../checkTime/checkTime";
import AddComment from "./AddComment";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {usePrevious} from "@react-hooks-library/core";

const { Text } = Typography;

export default function Comments({comment, user}) {
    const {
        isAddCommentsSuccess
    } = useSelector(state => state.comments);
    const [active, setActive] = useState(false);
    const [answers, setAnswers] = useState(comment?.answers);
    const prevAddedSuccess = usePrevious(isAddCommentsSuccess);


    // useEffect(() => {
    //     if (isAddCommentsSuccess && prevAddedSuccess === false) {
    //         setAnswers(answersCount + 1)
    //     }
    // }, [answersCount, isAddCommentsSuccess, prevAddedSuccess])
    
    return <Space style={{width: "100%", display: "flex", justifyContent: "left", alignItems: "start"}}
                  className="share-comment">
        <Space style={{display: "flex", justifyContent: "start"}}>
            <Avatar size="large"
                    src={`http://localhost:3001/${user?.images.path}`}
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
                    <Text style={{display: "block", fontWeight: "bold"}}>{user?.firstName} {user?.lastName}</Text>
                    <Text style={{
                        display: "block",
                        fontWeight: "50",
                        fontSize: "12px"
                    }}>  {checkTime((new Date() - new Date(comment?.comment?.createdAt)))}</Text>
                </Space>
                <Text style={{display: "block", marginTop: "10px"}}>{comment?.comment?.comment}</Text>
                <Space className="comments" style={{textAlign: "right", width: "100%"}}>
                    {
                        comment?.answers?.length > 0 ?
                            <Button type="link">Show {answers.count} answers</Button> : null
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
                comment?.answers?.filter(comment => comment.userId === user?.id).map(elem => (
                    <Space key={elem.id} style={{width: "100%", display: "flex", justifyContent: "left", alignItems: "start"}}
                           className="share-comment">
                        <Space style={{display: "flex", justifyContent: "start"}}>
                            <Avatar size="large"
                                    src={`http://localhost:3001/${user?.images.path}`}
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
                                    <Text style={{display: "block", fontWeight: "bold"}}>{user?.firstName} {user?.lastName}</Text>
                                    <Text style={{
                                        display: "block",
                                        fontWeight: "50",
                                        fontSize: "12px"
                                    }}>  {checkTime((new Date() - new Date(elem.createdAt)))}</Text>
                                </Space>
                                <Text style={{display: "block", marginTop: "10px"}}>{elem.comment}</Text>
                                <Space className="comments" style={{textAlign: "right", width: "100%"}}>
                                    {
                                        user ? <Button type="link" onClick={() => setActive(!active)}>Reply</Button> : null
                                    }
                                </Space>
                            </Space>
                        </Space>
                    </Space>
                ))
            }
        </Space>
    </Space>
}