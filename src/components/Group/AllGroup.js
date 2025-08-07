import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import groupImage from "../../assets/group.png";

const AllGroupContainer = styled(Link)`
  width: 360px;
  height: 200px;
  border-radius: 20px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 30px;
  gap: 30px;
`;

const GroupImage = styled.img`
  height: 140px;
`;

const GroupInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: #000000;

  &:hover {
    color: rgba(48, 48, 48, 0.5);
  }
`;

const GroupName = styled.div`
  font-weight: bold;
  font-size: 30px;
`;

const GroupCreatedAt = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: #5c5752;
`;

export default function AllGroup({ id, name, description, createdAt }) {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`;

  return (
    <AllGroupContainer
      to={{ pathname: "/group/detail", }}
      state={{ id, name, description, createdAt: formattedDate }}
    >
      <GroupImage src={groupImage} />
      <GroupInfoContainer>
        <GroupName>{name}</GroupName>
        <GroupCreatedAt>{formattedDate}</GroupCreatedAt>
      </GroupInfoContainer>
    </AllGroupContainer>
  );
}