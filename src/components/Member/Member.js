import React from "react";
import styled from "styled-components";

function InputFieldMem({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Container>
  );
}

export default InputFieldMem;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 45px;
  margin-top: 20px;
`;

const Label = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: white;
  padding: 10px 0px 10px 10px;
  width: 130px;
`;

const Input = styled.input`
  width: 370px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.19);
  border: none;
  color: white;
  border-radius: 50px;
  padding: 18px 33px;
  font-size: 18px;
  font-weight: 300;
  ::placeholder {
    color: white;
    opacity: 1;
  }
  &:hover {
    border: 1px solid rgb(224, 106, 52);
    background-color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    outline: none;
    border: 1px solid rgb(224, 106, 52);
    background-color: rgba(255, 255, 255, 0.4);
  }
`;
