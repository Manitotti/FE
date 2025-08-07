import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import masked from "../../assets/masked.png";
import hidden from "../../assets/hidden.png";

const MemberMatchInfoContainer = styled.div`
  width: 840px;
  height: 80px;
  border-radius: 50px;
  background: ${(props) => (props.isSelect ? "#CAC8C5" : "#E0DFDD")};
  padding: 20px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background: #cac8c5;
  }
`;

const MemberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
`;

const Image = styled.img`
  height: 40px;
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 20px;
  color: ${(props) => props.color || "#000"};
  cursor: pointer;

  ${(props) =>
    props.hover &&
    `
        &:hover {
            color: rgba(48, 48, 48, 0.5);
        }
    `}
`;

const ApproveButton = styled.button`
  background-color: #6aa84f;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
`;

const RejectButton = styled.button`
  background-color: #cc0000;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
`;

export default function MemberMatchInfo({
  id,
  nickname,
  isMatch,
  isReveal,
  matchId,
  matchNickname,
  isSelect,
  onClick,
  isPending,
  onApprove,
  onReject,
  myId,
  requestId,
}) {
  const navigate = useNavigate();

  const handleProfile = (isMe) => {
    if (isMe) {
      navigate("/mypage", { state: { id, nickname } });
    } else if (matchId && matchNickname) {
      navigate("/mypage", { state: { id: matchId, nickname: matchNickname } });
    }
  };

  let rightSideContent;

  if (isPending) {
    if (id === myId) {
      rightSideContent = <Name color="#5C5752">내 가입 신청</Name>;
    } else {
      rightSideContent = (
        <>
          <ApproveButton onClick={() => onApprove(requestId)}>
            승인
          </ApproveButton>
          <RejectButton onClick={() => onReject(requestId)}>거절</RejectButton>
        </>
      );
    }
  } else if (!isMatch) {
    rightSideContent = <Name color="#5C5752">아직 매칭되지 않았습니다</Name>;
  } else if (isMatch && !isReveal) {
    rightSideContent = (
      <>
        <Name>???</Name>
        <Image src={hidden} />
      </>
    );
  } else {
    rightSideContent = (
      <>
        <Name onClick={() => handleProfile(false)} hover>
          {matchNickname}
        </Name>
        <Image src={masked} />
      </>
    );
  }

  return (
    <MemberMatchInfoContainer isSelect={isSelect} onClick={onClick}>
      <MemberContainer>
        <Image src={masked} />
        <Name onClick={() => handleProfile(true)} hover>
          {nickname}
        </Name>
      </MemberContainer>
      <MemberContainer>{rightSideContent}</MemberContainer>
    </MemberMatchInfoContainer>
  );
}
