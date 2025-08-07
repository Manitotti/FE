import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import groupImage from "../../assets/group.png";

const ManageGroupContainer = styled.div`
    width: 1155px;
    height: 150px;
    border-radius: 20px;
    background: #FFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 30px 15px 15px;
    gap: 25px;
`;

const GroupInfoContainer = styled.div`
    display: flex;
    gap: 25px;
`;

const GroupImage = styled.img`
    height: 120px;
`;

const GroupInfoTextContainer = styled.div`
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
`;

const GroupName = styled.div`
    font-weight: bold;
    font-size: 30px;
`;

const GroupCreatedAt = styled.div`
    font-weight: bold;
    font-size: 25px;
    color: #5C5752;
`;

const GroupDescription = styled.div`
    font-weight: 500;
    font-size: 25px;
`;

export default function ManageGroup({ id, name, description, createdAt }) {
    const navigate = useNavigate();

    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}/${month}/${day}`;
    
    const handleMore = () => {
        navigate("/manage/detail", {
            state: { id, name, description, createdAt: formattedDate }
        });
    };

    return (
        <ManageGroupContainer>
            <GroupInfoContainer>        
                <GroupImage src={groupImage} />
                <GroupInfoTextContainer>
                    <GroupName>{name}</GroupName>
                    <GroupCreatedAt>{formattedDate}</GroupCreatedAt>
                    <GroupDescription>{description}</GroupDescription>
                </GroupInfoTextContainer>
            </GroupInfoContainer>
            <Button buttonText="More" buttonTextFont="damion" onClick={handleMore} />
        </ManageGroupContainer>
    );
}