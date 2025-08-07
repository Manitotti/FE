import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import GuestBook from "../components/Mypage/GuestBook";
import Button from "../components/Button";
import rabbit from "../assets/fav.png"
import introduce from "../assets/introduce.png";
import { AiOutlineSend } from 'react-icons/ai';

const MypageContainer = styled.div`
  width: 1280px;
  height: 720px;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const ProfileContainer = styled.div`
  width: 800px;
  height: 600px;
  border-radius: 20px 0 0 20px;
  background: #E0DFDD;
  padding: 20px 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProfileDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileDetailRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding: 20px 0;
`;

const GuestbookContainer = styled.div`
  width: 365px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const GuestbookDetailContainer = styled.div`
  width: 365px;
  height: 520px;
  border-radius: 0 20px 0 0;
  background: #E0DFDD;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const GuestbookContentContainer = styled.div`
  width: 365px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  
  overflow: hidden;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const GuestbookInputContainer = styled.div`
  width: 365px;
  height: 80px;
  border-radius: 0 0 20px 0;
  background: #3C3C3C;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 36px;
  color: #563213;
`;

const RabbitImage = styled.img`
  height: 500px;
  padding-left: 20px;
`;

const IntroduceImage = styled.div`
  background-image: url(${introduce});
  background-position: left;
  background-repeat: no-repeat;
  width: 408px;
  height: 260px;
`;

const IntroduceText = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: #563213;
  padding: 40px;
  width: 365px;
  height: 178px;
`;

const Input = styled.input`
  width: 280px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.19);
  border: none;
  color: white;
  padding: 10px;
  font-size: 20px;
  font-weight: 300;

  ::placeholder {
    color: white;
    opacity: 1;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
  &:focus {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

const Icon = styled(AiOutlineSend)`
  width: 30px;
  height: 30px;
  color: white;
  cursor: pointer;
`;

export default function Mypage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, nickname } = location.state;

  const [myMessage, setMyMessage] = useState("");
  const [guestBooks, setGuestBooks] = useState([]);
  const [isMine, setIsMine] = useState(false);
  const [guestBook, setGuestBook] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }
      
      try {
        console.log("프로필 조회 시작");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/profile/${id}`,
          config
        );
        setMyMessage(res.data.myMessage);
        setGuestBooks(res.data.guestBooks);
        setIsMine(res.data.mine);
      } catch (err) {
        console.error("프로필 조회 오류:", err);
        alert("프로필 정보를 불러오는 데 실패했습니다.");
        navigate("/manage");
      }
    };

    fetchProfile();
  }, []);

  const handleMessageEdit = () => {
    navigate("/mypage/myinfo");
  };

  const handleGusetBookSend = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    
    try {
      console.log("방명록 전송 시작");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      
      // 방명록 전송
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/guests`,
        {
          memberId: id,
          content: guestBook
        },
        config
      );

      // 전체 방명록 반영
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/${id}/guests`,
        config
      )
      setGuestBooks(res.data);
      setGuestBook("");
    } catch (err) {
      console.error("방명록 전송 오류:", err);
      alert("방명록을 전송하는 데 실패했습니다.");
    }
  };

  return (
    <MypageContainer>
      <ProfileContainer>
        <Title>{nickname}님의 PROFILE</Title>
        <ProfileDetailContainer>
          <RabbitImage src={rabbit} />
          <ProfileDetailRightContainer>
            <IntroduceImage>
              <IntroduceText>{myMessage}</IntroduceText>
            </IntroduceImage>
            { isMine && <Button backgroundColor="#E06A34" buttonText="메시지 변경" onClick={handleMessageEdit} /> }
          </ProfileDetailRightContainer>
        </ProfileDetailContainer>
      </ProfileContainer>
      <GuestbookContainer>
        <GuestbookDetailContainer>
          <Title>방명록</Title>
          <GuestbookContentContainer>
            {guestBooks.slice().reverse().map((guestBook) => (
              <GuestBook key={guestBook.id} content={guestBook.content} createdAt={guestBook.createdAt} />
            ))}
          </GuestbookContentContainer>
        </GuestbookDetailContainer>
        <GuestbookInputContainer>
          <Input type="text" value={guestBook} placeholder="방명록을 남겨주세요"
            onChange={(e) => setGuestBook(e.target.value)}
            onKeyDown={(e) => { if(e.key === "Enter") handleGusetBookSend(); }} />
          <Icon onClick={handleGusetBookSend} />
        </GuestbookInputContainer>
      </GuestbookContainer>
    </MypageContainer>
  );
}