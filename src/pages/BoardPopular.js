import React, { useEffect, useState } from "react";
import styled from "styled-components";
import masked from "../assets/masked.png";
import fav from "../assets/fav.png";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Container = styled.div`
  position: relative;
  width: 1280px;
  height: 720px;
  background: #d8cdb9;
  padding: 36px 40px 116px 40px; /* top, sides, bottom 간격 통일 */
  font-family: "Noto Sans KR", sans-serif;
  box-sizing: border-box;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f1e7;
  border-radius: 30px;
  padding: 0 20px;
  width: 600px;
  height: 50px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SearchIcon = styled(FaSearch)`
  font-size: 18px;
  margin-right: 10px;
  color: gray;
`;

const SearchInput = styled.input`
  flex: 1;
  font-size: 18px;
  border: none;
  outline: none;
  background: none;
  text-align: center;
  line-height: 50px;
  height: 50px;

  &::placeholder {
    color: #000;
    font-weight: 400;
  }
`;

const ClearButton = styled(IoMdClose)`
  font-size: 22px;
  color: gray;
  cursor: pointer;
  margin-right: 8px;
`;

const PostGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 82px;
  width: 100%;
  padding-bottom: 44px; /* 기존 margin-top: 44px에서 padding으로 대체 */
`;

const PostCardWrapper = styled.div`
  padding-top: ${(props) => props.top || "0px"};
`;

const PostCard = styled.div`
  width: 319px;
  height: 313px;
  background-color: #f8f1e7;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
  font-size: 20px;
  text-align: center;
`;

const EmptySection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 85px;
  flex-direction: row;
  padding-top: 44px; /* 기존 margin-top */
`;

const EmptyImage = styled.img`
  width: 150px;
  height: auto;
  object-fit: contain;
`;

const EmptyText = styled.p`
  font-size: 36px;
  font-weight: 500;
  line-height: 1.4;
  width: 190px;
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export default function BoardPopular() {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setPosts([]); // 실제 데이터로 대체 가능
  }, []);

  const clearInput = () => setKeyword("");

  return (
    <Container>
      <SearchBox>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            placeholder="게시글 제목 또는 내용을 입력해주세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {keyword && <ClearButton onClick={clearInput} />}
        </SearchContainer>
      </SearchBox>

      <PostGrid>
        <PostCardWrapper top="0px">
          <PostCard>인기글 TOP1</PostCard>
        </PostCardWrapper>
        <PostCardWrapper top="6px">
          <PostCard>인기글 TOP2</PostCard>
        </PostCardWrapper>
        <PostCardWrapper top="12px">
          <PostCard>인기글 TOP3</PostCard>
        </PostCardWrapper>
      </PostGrid>

      {posts.length === 0 && (
        <EmptySection>
          <EmptyImage src={fav} alt="검색결과 없음 토끼" />
          <EmptyText>
            검색 결과가
            <br /> 없어요
          </EmptyText>
        </EmptySection>
      )}
    </Container>
  );
}
