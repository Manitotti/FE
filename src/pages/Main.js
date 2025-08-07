import React from "react";
import styled from "styled-components";
import image from "../assets/fav.png";
import { Link } from "react-router-dom";

const MainContainer = styled.div`
  position: relative;
  width: 1280px;
  height: 720px;
  background: #d8cdb9;
  overflow: hidden;
  margin: 0 auto;
`;

const Image = styled.div`
  position: absolute;
  width: 400px;
  height: 613px;
  top: 120px;
  left: 100px;
  background-image: url(${image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Title = styled.div`
  position: absolute;
  width: 600px;
  left: 548px;
  top: 243px;
  font-family: "Damion", cursive;
  font-weight: 500;
  font-size: 150px;
  line-height: 100px;
  text-align: center;
  color: #000000;
`;

const StartButtonWrapper = styled.div`
  position: absolute;
  width: 293px;
  height: 60px;
  left: 724px;
  top: 463px;
  right: 262px;
  background: #716c67;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StartButtonText = styled(Link)`
  font-family: "Damion", cursive;
  font-weight: 400;
  font-size: 26px;
  color: #ffffff;

  &:hover {
    color: rgba(48, 48, 48, 0.5);
  }
`;

const AuthLinks = styled.div`
  position: absolute;
  left: 775px;
  top: 558px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500;
  font-size: 24px;
  letter-spacing: 0.05em;
  color: #000000;
`;

const StyledLink = styled(Link)`
  color: #000000;
  text-decoration: none;

  &:hover {
    color: rgba(48, 48, 48, 0.5);
  }
`;

function Main() {
  return (
    <MainContainer>
      <Image />
      <Title>ManittoTie</Title>
      <StartButtonWrapper>
        <StartButtonText to="/login">Start ManittoTie</StartButtonText>
      </StartButtonWrapper>
      <AuthLinks>
        <StyledLink to="/login">로그인</StyledLink>|
        <StyledLink to="/signup">회원가입</StyledLink>
      </AuthLinks>
    </MainContainer>
  );
}

export default Main;
