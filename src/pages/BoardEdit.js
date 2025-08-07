import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  width: 1280px;
  height: 720px;
  background-color: #d8cdb9;
  font-family: "Noto Sans KR", sans-serif;
  padding: 50px 64px 40px;
  box-sizing: border-box;
`;

const EditBox = styled.div`
  background-color: white;
  border-radius: 30px;
  padding: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  font-size: 20px;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid gray;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  font-size: 18px;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid gray;
  height: 300px;
  resize: none;
  margin-bottom: 30px;
`;

const Button = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 30px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  background-color: #e06a34;
  color: white;
`;

const BoardEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { groupId, postId } = location.state || {};

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/${groupId}/maniposts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
        alert("게시글 정보를 불러오지 못했습니다.");
        navigate(-1);
      }
    };

    if (groupId && postId) {
      fetchPost();
    }
  }, [groupId, postId, navigate]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/${groupId}/maniposts/${postId}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("게시글이 수정되었습니다.");
      navigate("/board", {
        state: { groupId, postUpdated: true },
      });
    } catch (err) {
      console.error("게시글 수정 실패:", err);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  return (
    <Container>
      <EditBox>
        <Input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={handleUpdate}>수정 완료</Button>
      </EditBox>
    </Container>
  );
};

export default BoardEdit;
