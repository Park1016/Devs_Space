import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { httpSelector } from "state/http";
import UserApi from "api/user";
import PostApi from "api/post";
import CommentApi from "api/comment";

const MypageContent = (props) => {
  const http = useRecoilValue(httpSelector);

  const navigate = useNavigate();
  const [data, setData] = useState();

  const { data: user } = useQuery(["mypageAuth"], async () => {
    return await new UserApi(http).me();
  });
  const { data: post } = useQuery(["mypagePost"], async () => {
    return await new PostApi(http).getPostByUsername(user.username);
  });
  const { data: comment } = useQuery(["mypageComment"], async () => {
    return await new CommentApi(http).getCommentByUsername(user.username);
  });
  const { data: bookmark } = useQuery(["mypageBookmark"], async () => {
    return await new UserApi(http).getPostByBookmark(user.bookmark);
  });

  useEffect(() => {
    if (post) {
      setData(post);
    }
  }, []);

  return (
    <>
      {user && (
        <section>
          <article>
            <p onClick={() => navigate("/settings")}>톱니바퀴</p>
            <div>{user.url}</div>
            <ul>
              <li>{user.username}</li>
              <li>{user.email}</li>
            </ul>
          </article>
          <ul>
            <li onClick={() => setData(post)}>내가 쓴 글</li>
            <li onClick={() => setData(comment)}>내가 쓴 댓글</li>
            <li onClick={() => setData(bookmark)}>찜</li>
          </ul>
          {data && (
            <ul>
              {data.map((item, index) => (
                <li key={index} onClick={() => navigate(`/post/${item.id}`)}>
                  {item.text}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </>
  );
};

export default MypageContent;
