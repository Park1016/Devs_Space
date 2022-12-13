﻿import * as postRepository from '../data/post.js';

export async function getByUsername(req, res) {
    const username = req.query.username;
    const data = await postRepository.getByUsername(username);
    res.status(200).json(data); 
}

export async function getById(req, res) {
    const id = req.params.id;
    const data = await postRepository.getById(id);
    res.status(200).json(data);  
}

export async function write(req, res) {
    const {table, text, lang, url} = req.body;
    // console.log(req.userId);
    const post = await postRepository.create(table, text, req.userId, lang, url);
    res.status(201).json(post);
}

export async function update(req, res) {
    const id = req.params.id;
    const {table, text, lang} = req.body;


    const post = await postRepository.getById(id);
    if(!post) {
        return res.sendStatus(404)
    }
    // 게시글 작성자와 현재 로그인한 유저가 다르다면 수정 권한이 없음
    if(post.userId !== req.userId) {
        return res.sendStatus(403);
    }

    const updated = await postRepository.update(id, table, text, lang);
    console.log('updated : ', updated);
    res.status(200).json(updated);
}

export async function remove(req, res) {
    const id = req.params.id;

    const post = await postRepository.getById(id);
    if(!post) {
        return res.sendStatus(404)
    }
    if(post.userId !== req.userId) {
        return res.sendStatus(403);
    }

    await postRepository.remove(id);
    res.sendStatus(204);
}