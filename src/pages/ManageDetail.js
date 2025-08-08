import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MemberMatchInfo from "../components/ManageDetail/MemberMatchInfo";
import Button from "../components/Button";
import groupImage from "../assets/group.png";

const ManageDetailContainer = styled.div`
  width: 1280px;
  height: 720px;
  padding: 50px 60px 10px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 55px;

  overflow: hidden;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const GroupDetailContainer = styled.div`
  width: 920px;
  padding: 40px;
  overflow: hidden;
  border-radius: 20px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 42px;
`;

const GroupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;
`;

const GroupImage = styled.img`
  height: 120px;
`;

const GroupInfoContainer = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const GroupName = styled.div`
  font-weight: bold;
  font-size: 30px;
`;

const GroupCcreatedAt = styled.div`
  font-weight: bold;
  font-size: 25px;
  color: #5c5752;
`;

const GroupDescription = styled.div`
  font-weight: 500;
  font-size: 25px;
`;

const MemberMatchInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;
`;

const CapacityControlContainer = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const CapacitySelect = styled.select`
  width: 120px;
  height: 40px;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #e0dfdd;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #e06a34;
  }
`;

export default function ManageDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, name, description, createdAt } = location.state;

  const [members, setMembers] = useState([]);
  const [isMatch, setIsMatch] = useState(false);
  const [isReveal, setIsReveal] = useState(false);
  const [selectMember, setSelectMember] = useState(null);
  const [groupCapacity, setGroupCapacity] = useState(20);
  const [myId, setMyId] = useState(null);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [myMatchInfo, setMyMatchInfo] = useState(null);
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      throw new Error("No token");
    }
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const postRequest = async (url, data = {}) => {
    try {
      const config = getAuthConfig();
      await axios.post(url, data, config);
      return true;
    } catch (err) {
      console.error("POST 요청 실패:", err);
      return false;
    }
  };

  const deleteRequest = async (url, data = {}) => {
    try {
      const config = getAuthConfig();
      config.data = data;
      await axios.delete(url, config);
      return true;
    } catch (err) {
      console.error("DELETE 요청 실패:", err);
      return false;
    }
  };

  const fetchMembers = async () => {
    try {
      const config = getAuthConfig();
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/${id}/matching/results`,
        config
      );
      setMembers(
        res.data.map((m) => ({
          id: m.giverId,
          nickname: m.giverNickname,
          matchId: m.receiverId,
          matchNickname: m.receiverNickname,
        }))
      );
      setIsMatch(true);
      setIsReveal(true);
    } catch {
      try {
        const config = getAuthConfig();
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/${id}/members`,
          config
        );
        const { matched, members } = res.data;
        setMembers(
          members.map((m) => ({
            id: m.id,
            nickname: m.nickname,
            matchId: null,
            matchNickname: null,
          }))
        );
        setIsMatch(matched);
        setIsReveal(false);
      } catch (error) {
        console.error("멤버 조회 오류:", error);
        alert("멤버 정보를 불러오는 데 실패했습니다.");
        navigate("/manage");
      }
    }
  };

  const fetchPendingMembers = async () => {
    try {
      const config = getAuthConfig();
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/groups/${id}/request`,
        config
      );
      setPendingMembers(res.data);
    } catch (err) {
      console.error("가입 요청 목록 조회 실패:", err);
    }
  };

  const handleMatch = async () => {
    if (
      await postRequest(
        `${process.env.REACT_APP_API_URL}/api/v1/${id}/matching/start`
      )
    ) {
      alert("마니또 매칭이 완료되었습니다.");
      fetchMembers();
    } else {
      alert("마니또 매칭에 실패했습니다.");
    }
  };

  const handleReveal = async () => {
    if (
      await postRequest(
        `${process.env.REACT_APP_API_URL}/api/v1/${id}/matching/reveal`
      )
    ) {
      alert("마니또 공개가 완료되었습니다.");
      fetchMembers();
    } else {
      alert("마니또 공개에 실패했습니다.");
    }
  };

  const handleMemberKick = async () => {
    if (!selectMember) {
      alert("추방할 멤버를 선택해주세요.");
      return;
    }

    const selected = members.find((m) => m.id === selectMember);
    const nickname = selected?.nickname || "이 멤버";

    if (!window.confirm(`정말로 ${nickname}님을 추방하시겠습니까?`)) return;

    if (
      await deleteRequest(
        `${process.env.REACT_APP_API_URL}/api/v1/groups/${id}/kick`,
        { memberId: selectMember }
      )
    ) {
      alert("멤버가 성공적으로 추방되었습니다.");
      setSelectMember(null);
      fetchMembers();
    } else {
      alert("멤버 추방에 실패했습니다.");
    }
  };

  const handleGroupDelete = async () => {
    if (!window.confirm("정말로 이 그룹을 삭제하시겠습니까?")) return;

    if (
      await deleteRequest(
        `${process.env.REACT_APP_API_URL}/api/v1/groups/${id}`
      )
    ) {
      alert("그룹이 성공적으로 삭제되었습니다.");
      navigate("/manage");
    } else {
      alert("그룹 삭제에 실패했습니다.");
    }
  };

  const handleCapacityChange = (e) => {
    const selected = Number(e.target.value);
    if (selected > 30) {
      alert("30명 초과는 프리미엄 요금제에서만 가능합니다.");
      return;
    }

    setGroupCapacity(selected);
  };

  const handleApprove = async (requestId) => {
    if (
      await postRequest(
        `${process.env.REACT_APP_API_URL}/api/v1/${id}/join/requests/${requestId}/approve`
      )
    ) {
      alert("가입 요청을 승인했습니다.");
      fetchMembers();
      fetchPendingMembers();
    } else {
      alert("가입 승인이 실패했습니다.");
    }
  };

  const handleReject = async (requestId) => {
    if (
      await postRequest(
        `${process.env.REACT_APP_API_URL}/api/v1/${id}/join/requests/${requestId}/reject`
      )
    ) {
      alert("가입 요청을 거절했습니다.");
      fetchPendingMembers();
    } else {
      alert("가입 거절이 실패했습니다.");
    }
  };

  const fetchMyMatchingInfo = async () => {
    try {
      const config = getAuthConfig();
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/${id}/matching/me`,
        config
      );
      console.log("내 마니또 정보:", res.data);
      setMyMatchInfo(res.data);
    } catch (err) {
      console.error("내 마니또 정보 조회 실패:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload?.userId) setMyId(payload.userId);
    }
    fetchMembers();
    fetchPendingMembers();
    fetchMyMatchingInfo();
  }, []);
  return (
    <ManageDetailContainer>
      <GroupDetailContainer>
        <GroupContainer>
          <GroupImage src={groupImage} />
          <GroupInfoContainer>
            <GroupName>{name}</GroupName>
            <GroupCcreatedAt>{createdAt}</GroupCcreatedAt>
            <GroupDescription>{description}</GroupDescription>
          </GroupInfoContainer>
          <CapacityControlContainer>
            <label htmlFor="capacity-select">인원 설정</label>
            <CapacitySelect
              id="capacity-select"
              value={groupCapacity}
              onChange={handleCapacityChange}
            >
              <option value={10}>10명</option>
              <option value={20}>20명</option>
              <option value={30}>30명</option>
              <option value={40} disabled>
                40명 (프리미엄)
              </option>
              <option value={50} disabled>
                50명 (프리미엄)
              </option>
            </CapacitySelect>
          </CapacityControlContainer>
        </GroupContainer>
        {myMatchInfo && (
          <>
            <MemberMatchInfo
              id={myId}
              nickname={
                members.find((m) => m.id === myId)?.nickname || "내 마니띠"
              }
              isMatch={true}
              isReveal={true}
              matchId={myMatchInfo.receiverId}
              matchNickname={myMatchInfo.receiverNickname}
              myId={myId}
              isPending={false}
            />
          </>
        )}

        {/* 가입 승인 대기자 목록 */}
        {pendingMembers.length > 0 && (
          <>
            <h2 style={{ marginBottom: "10px" }}>가입 승인 대기자</h2>
            <MemberMatchInfoContainer>
              {pendingMembers.map((pending) => (
                <MemberMatchInfo
                  key={pending.id}
                  id={pending.id}
                  nickname={pending.nickname}
                  isPending={true}
                  requestId={pending.requestId}
                  myId={myId}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </MemberMatchInfoContainer>
          </>
        )}

        {/* 현재 그룹 멤버 */}
        <h2 style={{ margin: "40px 0 10px" }}>그룹 멤버</h2>
        <MemberMatchInfoContainer>
          {members.map((member) => (
            <MemberMatchInfo
              key={member.id}
              id={member.id}
              nickname={member.nickname}
              isMatch={isMatch}
              isReveal={isReveal}
              matchId={member.matchId}
              matchNickname={member.matchNickname}
              isSelect={selectMember === member.id}
              onClick={() => setSelectMember(member.id)}
              isPending={false}
              myId={myId}
            />
          ))}
        </MemberMatchInfoContainer>
      </GroupDetailContainer>
      <ButtonContainer>
        <Button buttonText="마니또 매칭" onClick={handleMatch} />
        <Button buttonText="마니또 공개" onClick={handleReveal} />
        <Button
          backgroundColor="#E06A34"
          buttonText="멤버 추방"
          onClick={handleMemberKick}
        />
        <Button
          backgroundColor="#E06A34"
          buttonText="그룹 삭제"
          onClick={handleGroupDelete}
        />
      </ButtonContainer>
    </ManageDetailContainer>
  );
}
