import React from 'react'
import styled from 'styled-components'
import UserInput from './UserInput'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const nav = useNavigate();
  const onClick = () => {
    nav('/')
  }
  return (
    <HeaderContainer>
      <MainText onClick={onClick}>FC-Archive</MainText>
      <UserInput/>
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
export default Header