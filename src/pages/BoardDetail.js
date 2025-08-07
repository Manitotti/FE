import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { FaRegHeart, FaHeart, FaRegCommentDots } from "react-icons/fa";
import axios from "axios";

const Container = styled.div`
  width: 1280px;
  height: 720px;
  background-color: #d8cdb9;
  padding: 30px 82px 60px 82px;
  font-family: "Noto Sans KR", sans-serif;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const Box = styled.div`
  width: 1116px;
  background-color: #ffffff;
  border-radius: 20px;
  font-size: 24px;
  font-weight: bold;
  padding: ${({
    paddingTop = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    paddingRight = 0,
  }) =>
    `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`};
  margin-bottom: 31px;
  white-space: pre-line;
  line-height: 30px;
`;

const TitleBox = styled(Box)`
  height: 80px;
  display: flex;
  align-items: center;
`;

const ContentBox = styled(Box)`
  position: relative;
  min-height: 218px;
`;

const ContentLabel = styled.div`
  font-weight: bold;
`;

const PostContent = styled.div`
  margin-top: 22px;
  font-weight: 400;
`;

const EditInput = styled.textarea`
  width: 100%;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 20px;
  padding: 12px;
  margin-top: 22px;
  border: 1px solid #ccc;
  border-radius: 10px;
  resize: vertical;
`;

const EditButton = styled.button`
  background-color: #e06a34;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 24px;
  position: absolute;
  right: 24px;
  bottom: 24px;
  cursor: pointer;
  margin-left: 10px;
`;

const ReactionWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 28px;
`;

const HeartIcon = styled.div`
  font-size: 32px;
  cursor: pointer;
  margin-left: 20px;
`;

const CommentIcon = styled.div`
  font-size: 32px;
  margin-left: 16px;
  display: flex;
  align-items: center;
`;

const CommentInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  width: 1116px;
  height: 68px;
  border-radius: 20px;
  padding: 0 69px;
  gap: 15px;
`;

const CommentInput = styled.input`
  width: 100%;
  border: none;
  font-size: 24px;
  font-weight: bold;
  font-family: "Noto Sans KR", sans-serif;

  ::placeholder {
    color: #999999;
    font-weight: bold;
  }

  &:focus {
    outline: none;
  }
`;

const CommentButton = styled.button`
  width: 100px;
  height: 50px;
  background: #e06a34;
  border: none;
  border-radius: 30px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  padding-top: 43px;
`;

const BoardDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const { groupId, postId } = location.state || {};

  const token = localStorage.getItem("token");

  const fetchDetail = async () => {
    if (!groupId || !postId) {
      console.log(postId);
      alert("잘못된 접근입니다.");
      navigate("/group");
      return;
    }

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/${groupId}/maniposts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);

      setPost(res.data);
      setEditedTitle(res.data.title);
      setEditedContent(res.data.content);
      setComments(res.data.comments);
    } catch (err) {
      console.error("게시글 상세 조회 실패", err);
      alert("게시글을 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    console.log("location.state:", location.state);

    fetchDetail();
  }, [groupId, postId, navigate, token]);

  const handleEdit = () => {
    if (window.confirm("수정하시겠습니까?")) {
      setIsEditing(true);
    }
  };

  const handleUpdate = async () => {
    if (!window.confirm("수정 내용을 저장하시겠습니까?")) return;

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/maniposts/${postId}`,
        {
          title: editedTitle,
          content: editedContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("수정 완료!");

      navigate("/board", { state: { groupId } });
    } catch (err) {
      console.error("게시글 수정 실패", err);
      alert("수정 실패!");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/maniposts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("삭제 완료!");
      navigate("/board", { state: { groupId } });
    } catch (err) {
      console.error("게시글 삭제 실패", err);
      alert("삭제 실패!");
    }
  };

  const handleCommentMake = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      console.log("댓글 생성 시작");

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/comments`,
        {
          maniPostId: postId,
          content: comment,
        },
        config
      );
      setComment("");
      fetchDetail();
    } catch (err) {
      console.error("댓글 생성 오류:", err);
      alert("댓글을 생성하는 데 실패했습니다.");
    }
  };

  if (!post) {
    return (
      <Container>
        <h2>게시글을 불러오는 중입니다...</h2>
      </Container>
    );
  }

  return (
    <Container>
      <TitleBox paddingLeft={69}>
        게시글 제목:{" "}
        {isEditing ? (
          <EditInput
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          `${post.title} [${post.commentCount || 0}]`
        )}
      </TitleBox>

      <ContentBox paddingTop={24} paddingLeft={69} paddingRight={24}>
        <ContentLabel>게시글 내용</ContentLabel>
        {isEditing ? (
          <EditInput
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <PostContent>{post.content}</PostContent>
        )}
        {post.isMyPost && (
          <>
            {isEditing ? (
              <EditButton onClick={handleUpdate}>수정 완료</EditButton>
            ) : (
              <>
                <EditButton onClick={handleEdit}>게시글 수정</EditButton>
                <EditButton onClick={handleDelete}>게시글 삭제</EditButton>
              </>
            )}
          </>
        )}
      </ContentBox>

      <Box
        height={170}
        paddingTop={24}
        paddingBottom={24}
        paddingLeft={69}
        paddingRight={69}
      >
        {comments.map((comment) => (
          <div
            key={comment.id}
            style={{ paddingBottom: "16px", paddingTop: "16px" }}
          >
            <strong>{comment.writer}</strong>: {comment.content}
          </div>
        ))}
      </Box>

      <ReactionWrapper>
        <HeartIcon onClick={() => setLiked(!liked)}>
          {liked ? <FaHeart color="black" /> : <FaRegHeart />}
        </HeartIcon>
        <CommentIcon>
          <FaRegCommentDots />
        </CommentIcon>
      </ReactionWrapper>

      <CommentInputBox>
        <CommentInput
          placeholder="댓글 달기"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <CommentButton onClick={handleCommentMake}>댓글 달기</CommentButton>
      </CommentInputBox>
    </Container>
  );
};

export default BoardDetail;
