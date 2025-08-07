import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import GroupJoinForm from "../components/Group/GroupJoinForm";

export default function GroupRegister() {
  const location = useLocation();
  const navigate = useNavigate();

  const { id, name } = location.state || {};

  const handleSubmit = async (formData) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/groups/${id}/request`,
        formData,
        config
      );
      alert("가입 신청이 완료되었습니다!");
      navigate("/group");
    } catch (error) {
      console.error("가입 신청 실패:", error);
      console.log(id);
      alert("가입 신청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      <GroupJoinForm onSubmit={handleSubmit} />
    </div>
  );
}
