import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import profileImage from "../assets/masked.png";
import { Link } from "react-router-dom";
import carrot from "../assets/carrot.png";
import { BiCart } from "react-icons/bi";

const NavBarContainer = styled.nav`
  width: 100%;
  max-width: 1216px;
  height: 60px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-family: "Damion", cursive;
  font-size: 48px;
  font-weight: 500;
  color: #000;
  cursor: pointer;
`;

const LinkContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 38px;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 50px;
`;

const NavLink = styled(Link)`
  font-family: "Damion", cursive;
  font-size: 32px;
  font-weight: 500;
  color: #000;
  cursor: pointer;
  right: 38px;

  &:hover {
    color: rgba(48, 48, 48, 0.5);
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #000000;
  color: #ffffff;

  border: 1px solid #ccc;
  border-radius: 8px;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  height: 60px;
  width: 123px;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 20px;
  font-weight: 600;

  &:hover {
    background-color: #f0f0f0;
  }
  img {
    margin-right: 8px;
    width: 34px;
    height: 34px;
  }
`;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // 클릭 시 외부 영역 클릭하면 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  return (
    <NavBarContainer>
      <Logo to="/">ManittoTie</Logo>
      <LinkContainer>
        <NavLinks>
          <NavLink to="/group">Group</NavLink>
          <NavLink to="/manage">Manage</NavLink>
          <NavLink to="/mypage/myinfo">Mypage</NavLink>
        </NavLinks>

        <DropdownWrapper ref={dropdownRef}>
          <ProfileImage
            src={profileImage}
            alt="프로필"
            onClick={toggleDropdown}
          />
          {isOpen && (
            <DropdownContent>
              <DropdownItem>
                <img src={carrot} alt="Carrot Icon" />
                500
              </DropdownItem>
              <DropdownItem onClick={() => navigate("/mypage/manimall")}>
                <BiCart
                  style={{ marginRight: "9px", width: "30px", height: "30px" }}
                />
                마니몰
              </DropdownItem>
              <DropdownItem onClick={() => navigate("/mypage/attendance")}>
                출석체크
              </DropdownItem>
              <DropdownItem>로그아웃</DropdownItem>
            </DropdownContent>
          )}
        </DropdownWrapper>
      </LinkContainer>
    </NavBarContainer>
  );
};

export default NavBar;
