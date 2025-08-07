import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ManageGroup from "../components/Manage/ManageGroup";

const ManageContainer = styled.div`
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

const ManageGroupContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;
`;

export default function Manage() {
  const navigate = useNavigate();
  const [manageGroups, setManageGroups] = useState([]);

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
        
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/group`,
          config
        );
        setManageGroups(res.data);
      } catch (err) {
        console.error("그룹 조회 오류:", err);
        alert("그룹 정보를 불러오는 데 실패했습니다.");
        navigate("/group");
      }
    };

    fetchGroups();
  }, []);

  return (
    <ManageContainer>
      <Title className="damion">Manage</Title>
      <ManageGroupContainer>
        {manageGroups.map((group) => (
          <ManageGroup key={group.group_id} id={group.group_id} name={group.group_name} description={group.description} createdAt={group.created_at} />
        ))}
      </ManageGroupContainer>
    </ManageContainer>
  );
}