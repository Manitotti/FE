import React, { useState } from "react";
import styled from "styled-components";
import InputField from "../components/Login/InputField";
import fav from "../assets/fav.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [emailinput, setEmailinput] = useState("");
  const [passwordinput, setPasswordinput] = useState("");

  const handleSignupClick = () => {
    navigate("/signup"); // 회원가입 페이지로
  };

  const handleLoginClick = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailinput,
            password: passwordinput,
          }),
        }
      );

      if (!response.ok) {
        alert("로그인 실패: 이메일 또는 비밀번호를 확인하세요.");
        console.log("입력 이메일:", emailinput);
        console.log("입력 비밀번호:", passwordinput);
        return;
      }

      const data = await response.json();
      console.log("서버 응답:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("로그인 성공~");
        navigate("/group");
        console.log("입력 이메일:", emailinput);
        console.log("입력 비밀번호:", passwordinput);
      } else {
        alert("로그인 실패: 토큰이 없습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <MainContainer>
        <BoxContainer>
          <Title>로그인</Title>
          <InputField
            label="이메일"
            id="user-email"
            value={emailinput}
            onChange={(e) => {
              setEmailinput(e.target.value);
            }}
            placeholder="이메일을 작성해주세요."
          />
          <InputField
            label="비밀번호"
            id="user-password"
            type="password"
            value={passwordinput}
            onChange={(e) => {
              setPasswordinput(e.target.value);
            }}
            placeholder="비밀번호를 작성해주세요."
          />
          {message && <FailTo>{message}</FailTo>}

          <LoginButton onClick={handleLoginClick}>로그인</LoginButton>
          <TextContainer>
            <NormalText>회원이 아니신가요?</NormalText>
            <SignupText onClick={handleSignupClick}>회원가입</SignupText>
          </TextContainer>
        </BoxContainer>
        <Image />
      </MainContainer>
    </>
  );
}

export default Login;

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
  margin-bottom: 40px;
`;

const FailTo = styled.div`
  font-size: 14px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 300;
  margin-left: 80px;
  margin-top: 14px;
  color: white;
`;

const LoginButton = styled.button`
  width: 226px;
  height: 60px;
  left: 232px;
  margin-top: 42px;
  margin-left: 191.5px;
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

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-family: "Noto Sans KR", sans-serif;
  margin-top: 10px;
`;

const NormalText = styled.span`
  font-size: 16px;
  color: white;
  font-weight: 400;
`;

const SignupText = styled.span`
  font-size: 16px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    text-decoration: none;
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
