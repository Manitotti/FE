import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

function EmailCheck({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  const [message, setMessage] = useState("");

  const handleEmailCheck = () => {
    if (!value) {
      setMessage("이메일을 입력해주세요.");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/duplicate/email`, {
        email: value,
      })
      .then((res) => {
        const isDuplicated = res.data.duplicated;
        if (isDuplicated) {
          alert("이미 사용 중인 이메일입니다.");
        } else {
          alert("사용 가능한 이메일입니다.");
        }
      })
      .catch((err) => {
        const status = err.response?.status;
        if (status === 409 || err.response?.data?.duplicated === true) {
          alert("이미 사용 중인 이메일입니다.");
        } else {
          alert(err.response?.data?.message || "서버 오류가 발생했습니다.");
        }
      });
  };
  return (
    <EmailInputContainer>
      <Label htmlFor={id}>{label}</Label>
      <EmailInput
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <CheckButton onClick={handleEmailCheck}>중복확인</CheckButton>
    </EmailInputContainer>
  );
}

export default EmailCheck;

const EmailInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 45px;
  margin-top: 30px;
`;

const EmailInput = styled.input`
  height: 50px;
  background-color: rgba(255, 255, 255, 0.19);
  border: none;
  color: white;
  border-radius: 50px 0 0 50px;
  padding: 18px 20px;
  font-size: 18px;
  font-weight: 300;
  ::placeholder {
    color: white;
    opacity: 1;
  }
  &:hover {
    border: 1px solid rgb(224, 106, 52);
    background-color: rgba(255, 255, 255, 0.4);
  }
  &:focus {
    outline: none;
    border: 1px solid rgb(224, 106, 52);
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

const CheckButton = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  background-color: #e06a34;
  color: white;
  border-radius: 0 50px 50px 0;
  font-family: "Noto Sans KR";
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #c95a2d;
  }
  &:active {
    background-color: #a04b26;
  }
`;

const Label = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: white;
  padding: 10px 0px 10px 10px;
  width: 130px;
`;
