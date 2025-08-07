import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function GroupMake() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [message, setMessage] = useState("");
  const [groupname, setGroupname] = useState("");
  const [description, setDescription] = useState("");
  const [memberCount, setMemberCount] = useState(10);
  const handleMakeClick = () => {
    if (!groupname || !description) {
      setMessage("모든 항목을 입력해주세요.");
      return;
    }
    if (memberCount > 30) {
      alert(
        "무료 요금제에서는 30명까지만 생성할 수 있습니다.\n프리미엄 요금제로 업그레이드해주세요."
      );
      return;
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/v1/groups`,
        {
          groupName: groupname,
          description: description,
          memberCount: memberCount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        alert("그룹이 생성 되었습니다.");
        navigate("/group");
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "오류가 발생했습니다.");
        console.error(err);
      });
  };
  return (
    <MainContainer>
      <BoxContainer>
        <Title>그룹 생성</Title>

        <InputContainer>
          <Label>그룹명</Label>
          <Input
            maxLength={10}
            placeholder="최대 10자까지 입력 가능합니다"
            value={groupname}
            onChange={(e) => {
              setGroupname(e.target.value);
            }}
          />
        </InputContainer>
        <InputContainer>
          <Label>인원 수</Label>
          <SelectBox
            value={memberCount}
            onChange={(e) => {
              const selected = Number(e.target.value);
              if (selected > 30) {
                alert("프리미엄 요금제에서만 30명 초과 설정이 가능합니다.");
                return;
              }
              setMemberCount(selected);
            }}
          >
            <option value={10}>10명</option>
            <option value={20}>20명</option>
            <option value={30}>30명</option>
            <option value={40}>40명 (프리미엄)</option>
            <option value={50}>50명 (프리미엄)</option>
          </SelectBox>
        </InputContainer>

        <InputContainer>
          <Label>그룹 목적</Label>
          <InputPurpose
            placeholder="그룹 목적을 입력해주세요"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </InputContainer>
      </BoxContainer>
      <SaveButton onClick={handleMakeClick}>그룹 생성 저장</SaveButton>
    </MainContainer>
  );
}

export default GroupMake;

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
  height: 430px;
  background-color: #ffffff;
  border-radius: 20px;
  margin: 105px auto 30px auto;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 48px;
  color: #000;
  margin: 20px 0 15px 45px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 30px 0 0 45px;
`;

const Label = styled.label`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #000;
  margin-top: 10px;
  width: 140px;
`;

const Input = styled.input`
  width: 390px;
  height: 62px;
  background-color: #cac8c5;
  border: none;
  color: #000;
  border-radius: 15px;
  padding: 0px 33px;
  font-size: 18px;
  font-weight: 300;

  ::placeholder {
    color: #666;
  }
`;

const InputPurpose = styled.textarea`
  width: 390px;
  height: 120px;
  background-color: #cac8c5;
  border: none;
  color: #000;
  border-radius: 15px;
  padding: 18px 33px;
  font-size: 18px;
  font-weight: 300;
  resize: none;

  ::placeholder {
    color: #666;
  }
`;

const SaveButton = styled.button`
  width: 217px;
  height: 62px;
  background-color: #e06a34;
  border-radius: 50px;
  border: none;
  color: white;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 26px;
  font-weight: 700;
  margin-left: 531.5px;
`;
const SelectBox = styled.select`
  width: 390px;
  height: 60px;
  background-color: #cac8c5;
  color: #000;
  font-size: 18px;
  font-weight: 500;
  border: none;
  border-radius: 15px;
  padding: 0px 33px;
  appearance: none; /* 기본 브라우저 스타일 제거 */
  cursor: pointer;

  &:focus {
    outline: none;
    border: 2px solid #000000;
  }
`;
