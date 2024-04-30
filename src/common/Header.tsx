import React from 'react'
import styled from 'styled-components'
import UserInput from './UserInput'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  const nav = useNavigate();
  const location = useLocation();
  const onClick = () => {
    nav('/')
  }
  
  return (
    <HeaderContainer>
      <MainText onClick={onClick}>FC-Archive</MainText>
      <Wrapper>
        <League to='/league' $isActive={location.pathname.startsWith('/league')}>해외 축구</League>
        <UserInput/>
      </Wrapper>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const MainText = styled.h1`
  text-align: center;
  font-size: 40px;
  font-weight: 800;
  line-height: 1.6;
  margin-bottom: 20px;
  color : var(--textDefault);
  cursor:pointer;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`
const League = styled(Link)<{$isActive:boolean}>`
  font-size: 20px;
  margin: 0 10px;
  text-decoration: none;
  color: ${(props) => props.$isActive ? 'var(--textDefault)' : 'var(--nameColor)'};
  background-color: ${(props) => props.$isActive ? 'black' : 'transparent'};
  padding: 10px;
  border-radius: 10px;
`
export default Header