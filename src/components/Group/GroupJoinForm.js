import React, { useState } from "react";
import styled from "styled-components";

const GroupJoinForm = ({ onSubmit }) => {
  const [nickname, setNickname] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = () => {
    if (!nickname) {
      alert("별명을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("publicInfo", isPublic);
    if (imageFile) formData.append("profileImage", imageFile);

    onSubmit(formData);
  };

  return (
    <FormContainer>
      <Title>그룹 가입 신청</Title>

      <Section>
        <Label>가입 안내</Label>
        <Description>이 그룹은 운영자의 승인이 필요한 그룹입니다.</Description>
      </Section>

      <Section>
        <Label>프로필 이미지</Label>
        <ImageUpload>
          {previewUrl ? (
            <Preview src={previewUrl} />
          ) : (
            <PreviewPlaceholder>이미지 없음</PreviewPlaceholder>
          )}
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <FileInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <DeleteButton onClick={handleImageRemove}>삭제</DeleteButton>
          </div>
        </ImageUpload>
      </Section>

      <Section>
        <Label>별명</Label>
        <TextInput
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="사용할 별명을 입력하세요"
          maxLength={10}
        />
      </Section>

      <SubmitButton onClick={handleSubmit}>가입 신청하기</SubmitButton>
    </FormContainer>
  );
};

export default GroupJoinForm;

const FormContainer = styled.div`
  width: 600px;
  margin: 30px auto;
  padding: 70px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const Description = styled.div`
  font-size: 15px;
  color: #666;
`;

const ImageUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Preview = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const PreviewPlaceholder = styled.div`
  width: 80px;
  height: 80px;
  background-color: #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const FileInput = styled.input`
  padding: 8px 12px;
  font-size: 14px;
`;

const DeleteButton = styled.button`
  padding: 8px 12px;
  background-color: #ddd;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 20px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #e06a34;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
`;
