import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Container = styled.div`
  position: relative;
  width: 1280px;
  height: 720px;
  background-color: #d8cdb9;
  font-family: "Noto Sans KR", sans-serif;
  padding: 50px 64px 40px;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 42px;
`;

const GroupButton = styled.button`
  width: 217px;
  height: 45px;
  background-color: white;
  border: none;
  border-radius: 30px;
  font-size: 20px;
  font-weight: bold;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 30px;
  padding: 0 20px;
  width: 720px;
  height: 45px;
`;

const SearchIcon = styled(FaSearch)`
  font-size: 18px;
  margin-right: 10px;
  color: gray;
`;

const ClearButton = styled(IoMdClose)`
  font-size: 22px;
  color: gray;
  cursor: pointer;
`;

const SearchInput = styled.input`
  flex: 1;
  font-size: 16px;
  border: none;
  outline: none;
  background: none;
  text-align: center;

  &::placeholder {
    color: #000;
    font-weight: 400;
  }
`;

const PostContainer = styled.div`
  position: relative;
  background-color: white;
  width: 100%;
  height: 580px;
  padding: 100px 56px 40px 56px;
  border-radius: 30px;
  box-sizing: border-box;
  overflow-y: auto;
`;

const WriteButton = styled.button`
  position: absolute;
  top: 40px;
  right: 56px;
  width: 178px;
  height: 50px;
  background-color: #e06a34;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const Post = styled.div`
  background-color: #e0dfdd;
  border-radius: 15px;
  width: 100%;
  height: 79px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  cursor: pointer;

  &:first-of-type {
    margin-top: 56px;
  }

  & + & {
    margin-top: 28px;
  }

  .title {
    font-size: 15px;
    font-weight: 500;
    color: black;
    margin-bottom: 5px;
  }

  .date {
    font-size: 15px;
    font-weight: 400;
    color: black;
  }
`;

const EditButton = styled.button`
  background-color: #f9b233;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #e2a221;
  }
`;

const DeleteButton = styled.button`
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #c9302c;
  }
`;
const RightCenterActions = styled.div`
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 10px;
`;
const Board = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const groupId = location.state?.groupId || location.state?.id || null;
  console.log("location.state:", location.state);
  console.log("현재 그룹 ID:", groupId);
  const [keyword, setKeyword] = useState("");
  const [posts, setPosts] = useState([]);

  const clearInput = () => setKeyword("");

  const handleWriteClick = () => {
    if (!groupId) {
      alert("그룹 정보가 없습니다.");
      console.log("navigate to /board with groupId:", groupId);
      return;
    }
    console.log("navigate to /board with groupId:", groupId);
    navigate("/board/upload", { state: { groupId } });
  };

  const handleDetail = (postId) => {
    if (!groupId || !postId) {
      alert("게시글 상세 정보가 부족합니다.");
      return;
    }
    console.log("navigate 시 전달하는 값:", groupId);
    navigate("/board/detail", {
      state: { groupId, postId },
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/${groupId}/maniposts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(res.data);
      } catch (err) {
        console.error("게시글 조회 실패:", err);
        alert("게시글 목록을 불러오는 데 실패했습니다.");
      }
    };

    if (groupId) {
      fetchPosts();
    }
    if (location.state?.postCreated) {
      fetchPosts();

      navigate(location.pathname, {
        replace: true,
        state: { groupId }, // 상태 초기화
      });
    }
  }, [groupId, navigate, location]);

  const filteredPosts = posts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(keyword.toLowerCase()) ||
        (post.content &&
          post.content.toLowerCase().includes(keyword.toLowerCase()))
    )
    .reverse(); // 최신 글이 위로
  const handleEdit = (postId) => {
    navigate("/board/edit", {
      state: { groupId, postId },
    });
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("정말 이 게시글을 삭제하시겠습니까?")) return;

    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/${groupId}/maniposts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("게시글이 삭제되었습니다.");
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      console.error("게시글 삭제 실패:", err);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  return (
    <Container>
      <FilterSection>
        <GroupButton>그룹 {groupId}</GroupButton>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            placeholder="게시글 제목 또는 내용을 입력해주세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {keyword && <ClearButton onClick={clearInput} />}
        </SearchContainer>
      </FilterSection>

      <PostContainer>
        <WriteButton onClick={handleWriteClick}>글쓰기</WriteButton>
        {filteredPosts.map((post) => (
          <Post key={post.id} onClick={() => handleDetail(post.id)}>
            <div className="title">
              {post.title} [{post.commentCount || 0}]
            </div>
            <div className="date">{post.createdAt.split("T")[0]}</div>
            <RightCenterActions onClick={(e) => e.stopPropagation()}>
              <EditButton onClick={() => handleEdit(post.id)}>수정</EditButton>
              <DeleteButton onClick={() => handleDelete(post.id)}>
                삭제
              </DeleteButton>
            </RightCenterActions>
          </Post>
        ))}
      </PostContainer>
    </Container>
  );
};

export default Board;
