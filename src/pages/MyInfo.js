import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputRow from "../components/Mypage/InputRow";
import image from "../assets/fav.png";
import axios from "axios";
const MyInfo = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("로그인이 필요합니다.");
  }

  // 초기값을 로컬스토리지에서 불러오기
  const [message, setMessage] = useState(
    () => localStorage.getItem("message") || ""
  );
  const [isMessagePosted, setIsMessagePosted] = useState(() => {
    return localStorage.getItem("isMessagePosted") === "true";
  });
  const [form, setForm] = useState({
    nickname: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  // 회원 정보 GET 요청
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/mypage`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        setForm((prev) => ({
          ...prev,
          nickname: data.nickname || "",
          email: data.email || "",
          password: data.password || "",
        }));
      })
      .catch((err) => {
        console.error("회원정보 불러오기 실패:", err);
      });
  }, [token]);

  // message가 바뀔 때 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem("message", message);
  }, [message]);

  // isMessagePosted가 바뀔 때 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem("isMessagePosted", isMessagePosted.toString());
  }, [isMessagePosted]);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  // const handleSave = async () => {
  //   try {
  //     console.log("닉네임 저장 요청 보냄:", form.nickname);
  //     console.log("토큰:", token);
  //     const res1 = await axios.put(
  //       `${process.env.REACT_APP_API_URL}/api/v1/mypage/nickname`,
  //       { nickname: form.nickname },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log("닉네임 저장 응답:", res1.data);

  //     console.log("상태메세지 저장 요청 보냄:", message);
  //     const res2 = await axios.post(
  //       `${process.env.REACT_APP_API_URL}/api/v1/mypage/message`,
  //       { message },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log("상태메세지 저장 응답:", res2.data);

  //     alert("정보가 성공적으로 저장되었습니다.");
  //   } catch (err) {
  //     console.error("저장 실패:", err);
  //     alert(err.response?.data?.message || "오류가 발생했습니다.");
  //     console.error("저장 실패:", err.response?.data || err);
  //   }
  // };

  const handleSave = async () => {
    try {
      // 닉네임 저장
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/mypage/nickname`,
        { nickname: form.nickname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 상태메세지 저장: 처음만 POST, 이후는 PUT
      const method = isMessagePosted ? "put" : "post";
      const url = `${process.env.REACT_APP_API_URL}/api/v1/mypage/message`;

      console.log(`${method.toUpperCase()} 요청 보냄:`, message);

      const res = await axios({
        method,
        url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { message },
      });

      console.log(`상태메세지 ${method.toUpperCase()} 응답:`, res.data);

      alert("정보가 성공적으로 저장되었습니다.");

      // 처음 POST가 끝났으면 isMessagePosted를 true로 전환
      if (!isMessagePosted) setIsMessagePosted(true);
    } catch (err) {
      console.error("저장 실패:", err);
      alert(err.response?.data?.message || "오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <MainBox>
        <ImageBox>
          <Image src={image} alt="토끼" />
        </ImageBox>

        <FormBox>
          <Title>{form.nickname || "회원"}님의 MYPAGE</Title>
          <Card>
            <InputRow
              label="상태메세지"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <InputRow
              label="닉네임"
              value={form.nickname}
              onChange={handleChange("nickname")}
            />
            <InputRow
              label="이메일"
              value={form.email}
              disabled
              // onChange={handleChange("email")}
            />
            <InputRow
              label="비밀번호"
              value={form.password}
              // onChange={handleChange("password")}
              type="password"
              autoComplete="new-password"
              disabled
            />
            <InputRow
              label="새 비밀번호"
              value={form.newPassword}
              inputStyle={{ fontSize: "14px" }}
              onChange={handleChange("newPassword")}
              type="password"
              fontSize="14px"
              style={{ marginTop: "27px", borderBottom: "none" }}
            />
            <InputRow
              label="새 비밀번호 확인"
              value={form.confirmPassword}
              inputStyle={{ fontSize: "14px" }}
              onChange={handleChange("confirmPassword")}
              type="password"
              fontSize="14px"
              style={{ borderBottom: "none" }}
            />
          </Card>
          <SaveButton onClick={handleSave}>저장</SaveButton>
        </FormBox>
      </MainBox>
    </Container>
  );
};

export default MyInfo;

const Container = styled.div`
  width: 1280px;
  height: 720px;
  background: #d8cdb9;
  overflow: hidden;
  margin: 0 auto;
`;

const MainBox = styled.div`
  background-color: #e0dfdd;
  width: 1100px;
  height: 600px;
  margin: 50px auto;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  flex: row;
`;

const ImageBox = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 600px;
`;

const Image = styled.img`
  width: 350px;
  height: 500px;
  object-fit: contain;
`;

const FormBox = styled.div`
  flex-shrink: 0;
  margin-left: 30px;
`;

const Card = styled.div`
  background-color: rgba(89, 50, 21, 0.8);
  padding: 40px;
  border-radius: 20px;
  width: 500px;
`;

const SaveButton = styled.button`
  width: 170px;
  height: 60px;
  color: white;
  background-color: #e06a34;
  font-size: 24px;
  font-weight: 600;
  border-radius: 50px;
  border: none;
  margin: 17px auto 0 auto;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #563213;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 25px;
`;
