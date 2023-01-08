import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

import { httpSelector } from "state/http";
import UserApi from "api/user";
import { makeFormData } from "hooks/makeFormData";
import Input from "components/Input/Input";

const SignUpForm = (props) => {
  const navigate = useNavigate();

  const [checkAuthNum, setCheckAuthNum] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    authNum: "",
    url: "",
  });

  const http = useRecoilValue(httpSelector);

  const onPhoto = (e) => {
    const image = e.target.files[0];
    setForm({ ...form, [e.target.name]: image });
  };

  const onSubmitPhoto = async () => {
    const formData = new FormData();
    formData.append("url", form.url);
    const res = await new UserApi(http).photo(formData);
    console.log(res);
  };

  const onAuthNum = async () => {
    const email = form.email;
    const authNum = form.authNum;
    const formData = makeFormData({ email, authNum });
    const res = await new UserApi(http).checkAuthNum(formData);
    if (res) {
      alert("인증이 완료되었습니다");

      // 회원가입
      try {
        const res = await new UserApi(http).signup(formData);
        if (res) {
          alert("회원가입이 완료되었습니다");
          setForm({ name: "", username: "", password: "", email: "", url: "" });
          navigate("/login");
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      setForm({ ...form, authNum: "" });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (form.url) {
      await onSubmitPhoto();
    }

    const name = form.name;
    const username = form.username;
    const password = form.password;
    const email = form.email;
    const url = form.url;

    const formData = makeFormData({ name, username, password, email, url });

    try {
      const res = await new UserApi(http).certEmail(formData);
      if (res) {
        setCheckAuthNum(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      encType="multipart/form-data"
      method="post"
    >
      <label htmlFor="name">이름</label>
      <Input
        type={"text"}
        name={"name"}
        id={"name"}
        value={form.name}
        form={form}
        setForm={setForm}
      />
      <label htmlFor="username">아이디</label>
      <Input
        type={"text"}
        name={"username"}
        id={"username"}
        value={form.username}
        form={form}
        setForm={setForm}
      />
      <label htmlFor="password">비밀번호</label>
      <Input
        type={"password"}
        name={"password"}
        id={"password"}
        value={form.password}
        form={form}
        setForm={setForm}
      />
      <label htmlFor="email">이메일</label>
      <Input
        type={"email"}
        name={"email"}
        id={"email"}
        value={form.email}
        form={form}
        setForm={setForm}
        readOnly={checkAuthNum && true}
      />
      {checkAuthNum && (
        <>
          <label htmlFor="authNum">인증번호</label>
          <Input
            type={"text"}
            name={"authNum"}
            id={"authNum"}
            value={form.authNum}
            form={form}
            setForm={setForm}
          />
          <button type="button" onClick={onAuthNum}>
            인증확인
          </button>
        </>
      )}
      <label htmlFor="url">프로필 사진</label>
      <input
        type="file"
        name="url"
        id="url"
        accept="imgae/*"
        onChange={(e) => onPhoto(e)}
      />
      <button type="submit">회원가입</button>
    </form>
  );
};

export default SignUpForm;
