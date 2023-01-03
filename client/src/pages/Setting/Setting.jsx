import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

import { authState } from "state/auth";
import { checkAuth } from "hooks/checkAuth";
import SettingContent from "containers/SettingContent/SettingContent";

const Setting = (props) => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);

  useEffect(() => {
    if (!auth) {
      alert("로그인 후 접근 가능한 페이지입니다");
      navigate("/");
    }
  }, [auth]);

  return <>{auth && <SettingContent />}</>;
};

export default Setting;
