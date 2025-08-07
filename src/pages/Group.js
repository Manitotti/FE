import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyGroup from "../components/Group/MyGroup";
import AllGroup from "../components/Group/AllGroup";
import Button from "../components/Button";

const GroupContainer = styled.div`
  position: relative;
  width: 1280px;
  height: 720px;
  margin: 0 auto;
  padding: 10px 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;

  overflow: hidden;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const Title = styled.div`
  font-size: 48px;
  line-height: 100px;
`;

const MyGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MyGroupLeftContainer = styled.div`
  width: 920px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 50px;

  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scrollbar-width: none;  
`;

const MyGroupRightContainer = styled.div`
  width: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AllGroupContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;
`;

export default function Group() {
  const navigate = useNavigate();
  const [myGroups, setMyGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      try {
        console.log("그룹 조회 시작");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        // 내 그룹 조회
        const myRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/group`,
          config
        );
        setMyGroups(myRes.data);

        // 전체 그룹 조회
        const allRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/groups`,
          config
        );
        setAllGroups(allRes.data);
      } catch (err) {
        console.error("그룹 조회 오류:", err);
        alert("그룹 정보를 불러오는 데 실패했습니다.");
        navigate("/login");
      }
    };

    fetchGroups();
  }, []);

  const handleGroupMake = () => {
    navigate("/group/make");
  };

  return (
    <GroupContainer>
      <Title className="damion">My Groups</Title>
      <MyGroupContainer>
        <MyGroupLeftContainer>
          {myGroups.map((group) => (
            <MyGroup key={group.group_id} id={group.group_id} name={group.group_name} />
          ))}
        </MyGroupLeftContainer>
        <MyGroupRightContainer>
          <Button buttonText="그룹 생성" onClick={handleGroupMake} />
        </MyGroupRightContainer>
      </MyGroupContainer>
      <Title className="damion">All Groups</Title>
      <AllGroupContainer>
        {allGroups.map((group) => (
          <AllGroup key={group.group_id} id={group.group_id} name={group.group_name} description={group.description} createdAt={group.created_at} />
        ))}
      </AllGroupContainer>
    </GroupContainer>
  );
}