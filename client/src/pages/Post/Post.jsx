﻿import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Post.module.scss';
import classNames from 'classnames/bind';
import { useQuery } from '@tanstack/react-query';
import PostApi from 'api/post';
import FramePost from 'components/FramePost/FramePost';
import Comment from 'components/Comment/Comment';
import { HttpContext } from 'context/httpContext';

const Post = (props) => {

    const cx = classNames.bind(styles);
    const { id } = useParams();
    const { http } = useContext(HttpContext);
    const {isLoading, error, data} = useQuery(['post', id], async()=>{
        return await new PostApi(http).getPostById(id);
    });

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>error!</p>}
            {data &&
                <>
                    <FramePost value={data} />
                    <Comment />
                </>
            }
        </>
    )
}

export default Post;