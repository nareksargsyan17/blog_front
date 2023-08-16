import {Avatar, Form, Input, Space} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCommentsRequest, changeCommentsList} from "../../redux/comment/actions";
import {usePrevious} from "@react-hooks-library/core";
import {changePostCommentCount} from "../../redux/post/actions";

export default function AddComment({user, parentId, setAnswers}) {
    const {
        post,
        commentCount
    } = useSelector(state => state.posts);
    const {
        comments,
        addedComment,
        isAddCommentsSuccess
    } = useSelector(state => state.comments);
    const dispatch = useDispatch();
    const prevAddedSuccess = usePrevious(isAddCommentsSuccess);

    useEffect(() => {
        if (isAddCommentsSuccess && prevAddedSuccess === false) {
            let newCommentsList = [...comments];
            if (parentId === null) {
                newCommentsList.unshift({
                    comment : addedComment,
                    answers: []
                })
                dispatch(changeCommentsList(newCommentsList))
            } else {
                setAnswers((oldAnswers => {
                    console.log(oldAnswers)
                    oldAnswers.unshift(addedComment)
                    return oldAnswers
                }))
            }
            dispatch(changePostCommentCount(commentCount + 1))
        }
    }, [addedComment, commentCount, comments, dispatch, isAddCommentsSuccess, parentId, prevAddedSuccess, setAnswers])


    return <Space style={{width: "100%", display: "flex", justifyContent: "left", alignItems: "center", background: "white"}} className="share-comment">
        <Avatar size="large"
                src={`http://localhost:3001/${user?.images.path}`}
        />
        <Form onSubmitCapture={(e) => {
            dispatch(addCommentsRequest({
                comment : e.target[0].value,
                postId: post.id,
                parentId: parentId
            }))
            
            e.target.reset()
        }}>
            <Form.Item
                name="comment"
            >
                <Input  style={{width: "100%", padding: "10px 15px", borderRadius: "30px"}} placeholder="Add a comment"/>
            </Form.Item>
        </Form>
    </Space>
}