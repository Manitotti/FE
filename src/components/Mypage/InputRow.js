import React from "react";
import styled from "styled-components";

const InputRow = ({
  label,
  value,
  type = "text",
  onChange,
  fontSize = "16px",
  inputStyle,
  style,
}) => {
  return (
    <Row style={style}>
      <Label style={{ fontSize }}>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        fontSize={inputStyle?.fontSize}
        style={inputStyle}
      />
    </Row>
  );
};

export default InputRow;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #f8f1e7;
  padding: 12px 0;
`;

const Label = styled.label`
  color: #f8f1e7;
  font-size: 1.2rem;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: #f8f1e7;
  text-align: right;
  font-size: 1.2rem;
  width: 60%;
  &:focus {
    outline: none;
  }
`;
