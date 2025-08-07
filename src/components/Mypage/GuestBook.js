import React from "react";
import styled from "styled-components";
import masked from "../../assets/masked.png";

const GuestBookContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 18px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border: solid 3px #563213;
  border-radius: 100px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
`;

const Content = styled.div`
  font-weight: 500;
  font-size: 20px;
`;

const CreatedAt = styled.div`
  font-weight: 500;
  font-size: 10px;
  color: #5C5752;
`;

export default function GuestBook({ content, createdAt }) {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`;

  return (
    <GuestBookContainer>
      <Image src={masked} />
      <ContentContainer>
        <Content>{content}</Content>
        <CreatedAt>{formattedDate}</CreatedAt>
      </ContentContainer>
    </GuestBookContainer>
  );
}