﻿import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import FrameType from "containers/FrameType/FrameType";

function FramePost({ value }) {
  const {
    id,
    title,
    text,
    createdAt,
    view,
    type,
    tag,
    progress,
    username,
    url,
  } = value;

  return (
    <>
      <article>
        <div>
          <p>{url}</p>
          <p>{username}</p>
        </div>
        <div>
          <p>{title}</p>
          <p>{createdAt}</p>
        </div>
      </article>
      {tag.length !== 0 && (
        <div>
          {tag.map((item, index) => (
            <p key={`tag${index}`}>{item}</p>
          ))}
        </div>
      )}
      <p>{text}</p>
      <FrameType type={type} />
    </>
  );
}

export default FramePost;