import React from "react";
import styled from "styled-components";
import { useState } from "react";
import coffeeIcon from "../assets/coffee.svg";
import breadIcon from "../assets/bread.svg";
import chickenIcon from "../assets/chicken.svg";
import burgerIcon from "../assets/burger.svg";
import donutIcon from "../assets/donut.svg";
import ediya from "../assets/ediya.svg";

const PageWrapper = styled.div`
  width: 1280px;
  height: 720px;
  padding: 48px;

  overflow: hidden;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const SearchTitle = styled.h2`
  margin-top: 24px;
  color: #fff;
  font-family: "Noto Sans";
  font-size: 40px;
  font-weight: 600;
`;

const SearchInputWrapper = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 24px;
  width: 400px;
`;

const SearchUnderline = styled.div`
  width: 410px;
  height: 2px;
  background: #fff;
  margin-top: 8px;
`;

const ProductGrid = styled.div`
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(3, 389px);
  gap: 8px;
`;

const ProductBox = styled.div`
  width: 389px;
  height: 389px;
  border-radius: 20px;
  background: #d9d9d9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const ProductName = styled.div`
  font-size: 24px;
  margin: 10px;
`;

const ProductPrice = styled.div`
  font-size: 20px;
`;
const ProductImage = styled.img`
  width: 200px;
  height: 200px;

  object-fit: cover;
  border-radius: 20px 20px 0 0;
`;

export default function ManiMall() {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    { name: "스타벅스 아메리카노", price: "1500캐롯", image: coffeeIcon },
    { name: "파리바게뜨 소금빵", price: "1200캐롯", image: breadIcon },
    { name: "BHC 뿌링클", price: "9500캐롯", image: chickenIcon },
    { name: "버거킹 와퍼세트", price: "7200캐롯", image: burgerIcon },
    { name: "이디야 토피넛 라떼", price: "4100캐롯", image: ediya },
    {
      name: "던킨 먼치킨 10개입",
      price: "4300캐롯",
      image: donutIcon,
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapper>
      <SearchTitle>무엇을 찾으시나요?</SearchTitle>
      <SearchInputWrapper>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="상품명을 입력해 주세요"
        />
        <SearchUnderline />
      </SearchInputWrapper>

      <ProductGrid>
        {filteredProducts.map((product, index) => (
          <ProductBox key={index}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price}</ProductPrice>
          </ProductBox>
        ))}
      </ProductGrid>
    </PageWrapper>
  );
}
