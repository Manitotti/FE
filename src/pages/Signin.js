import React, { useState } from "react";
import styled from "styled-components";
import InputFieldMem from "../components/Member/Member";
import EmailCheck from "../components/Member/EmailCheck";
import fav from "../assets/fav.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const navigate = useNavigate();

  // 유효성 검사 함수
  const validateInputs = () => {
    let valid = true;

    if (useridinput.length < 1 || useridinput.length > 4) {
      setNicknameMessage("닉네임은 1자 이상 4자 이하로 입력해주세요.");
      valid = false;
    } else {
      setNicknameMessage("");
    }

    if (!emailinput.includes("@")) {
      setEmailMessage("올바른 이메일 형식을 입력해주세요.");
      valid = false;
    } else {
      setEmailMessage("");
    }

    if (passwordinput.length < 8) {
      setPasswordMessage("비밀번호는 최소 8자 이상이어야 합니다.");
      valid = false;
    } else if (passwordinput !== passwordCheckInput) {
      setPasswordMessage("비밀번호가 일치하지 않습니다.");
      valid = false;
    } else {
      setPasswordMessage("");
    }

    return valid;
  };

  const handleSignupClick = () => {
    if (!validateInputs()) {
      return;
    }
    registeraxios();
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const [useridinput, setUseridinput] = useState("");
  const [emailinput, setEmailinput] = useState("");
  const [passwordinput, setPasswordinput] = useState("");
  const [passwordCheckInput, setPasswordCheckInput] = useState("");
  const [message, setMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const registeraxios = () => {
    console.log("회원가입 요청 시작");
    const csrfToken = getCookie("csrftoken");
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/v1/signup`,
        {
          email: emailinput,
          password: passwordinput,
          nickname: useridinput,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken, // CSRF 토큰 전달
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키 포함 요청
        }
      )
      .then((response) => {
        console.log(response);
        alert("회원가입 성공");
        if (response.status === 200) {
          navigate("/login");
        }
      })
      .catch((err) => {
        setMessage(err.response?.data?.message);
        console.log(err);
      });
  };

  return (
    <>
      <MainContainer>
        <BoxContainer>
          <Title>회원가입</Title>
          <InputFieldMem
            label="이름"
            id="user-id"
            value={useridinput}
            onChange={(e) => {
              setUseridinput(e.target.value);
            }}
            placeholder="이름을 작성해주세요."
            minLength={1}
            maxLength={4}
          />
          <FailTo>{nicknameMessage || " "}</FailTo>

          <EmailCheck
            label="이메일"
            id="user-mail"
            type="email"
            value={emailinput}
            onChange={(e) => {
              setEmailinput(e.target.value);
            }}
            placeholder="이메일을 작성해주세요."
          />
          <FailTo>{emailMessage || " "}</FailTo>
          <InputFieldMem
            label="비밀번호"
            id="user-password"
            type="password"
            value={passwordinput}
            onChange={(e) => {
              setPasswordinput(e.target.value);
            }}
            placeholder="비밀번호를 작성해주세요."
            minLength={8}
          />
          <InputFieldMem
            id="user-password-check"
            type="password"
            value={passwordCheckInput}
            onChange={(e) => setPasswordCheckInput(e.target.value)}
            placeholder="비밀번호를 다시 작성해주세요."
            minLength={8}
          />
          <FailTo>{passwordMessage || " "}</FailTo>
          <SigninButton onClick={handleSignupClick}>회원가입</SigninButton>
        </BoxContainer>
        <Image />
      </MainContainer>
    </>
  );
}

export default Signin;

const MainContainer = styled.div`
  position: relative;
  width: 1280px;
  height: 720px;
  background: #d8cdb9;
  overflow: hidden;
  margin: 0 auto;
`;

const BoxContainer = styled.div`
  width: 600px;
  height: 560px;
  background-color: rgba(89, 50, 21, 0.8);
  border-radius: 20px;
  margin-left: 40px;
  margin-top: 105px;
  position: absolute;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 48px;
  color: white;
  margin-top: 20px;
  margin-left: 48px;
  margin-bottom: 15px;
`;

const FailTo = styled.div`
  font-size: 14px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 300;
  margin-left: 190px;
  /* margin-top: 8px; */
  color: white;
  min-height: 20px; /* 메시지 유무에 상관없이 공간 확보 */
  display: flex;
  align-items: center;
`;

const SigninButton = styled.button`
  width: 166px;
  height: 49px;
  margin-top: 50px;
  margin-left: 400px;
  background: #ffffff;
  border-radius: 50px;
  border: none;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 31px;
  color: #e06a34;
  &:active {
    background-color: #e06a34;
    color: #ffffff;
  }
  &:hover {
    background-color: #e06a34;
    color: #ffffff;
  }
`;

const Image = styled.div`
  position: absolute;
  width: 400px;
  height: 613px;
  top: 120px;
  left: 757px;
  background-image: url(${fav});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
