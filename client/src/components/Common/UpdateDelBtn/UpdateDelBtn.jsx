﻿import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { HttpSelector } from 'state/http';
import CommentApi from 'api/comment';
import PostApi from 'api/post';


function UpdateDelBtn({ type, id, setEdit }) {

    const [show, setShow] = useState(false);

    const http = useRecoilValue(HttpSelector);

    const navigate = useNavigate();

    const onUpdate = () => {
        switch(type) {
            case 'post':
                navigate(`/post/update/${id}`);
                break;
            case 'comment':
                setEdit(true);
                break;
            default:
                break;
        }
    }

    const onDelete = async() => {
        const check = window.confirm(`${type === 'post' ? '게시글을' : '댓글을'} 삭제하시겠습니까?`);
        if(!check) {
            return;
        }
        switch(type) {
            case 'post':
                await new PostApi(http).deletePost(id);
                alert('게시글이 삭제되었습니다');
                navigate('/');
                break;
            case 'comment':
                await new CommentApi(http).deleteComment(id);
                alert('댓글이 삭제되었습니다');
                break;
            default:
                break;
        }
        setShow(false);
    }

    const onBlur = () => {
        setShow(false);
    }

    return (
        <>
            <button type='button' onMouseDown={()=>setShow(!show)} onBlur={onBlur}>...</button>
            {show && 
            <ul>
                <li onMouseDown={onUpdate}>수정</li>
                <li onMouseDown={onDelete}>삭제</li>
            </ul>}
        </>
    );
}

export default UpdateDelBtn;