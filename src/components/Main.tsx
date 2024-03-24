import React from 'react'
import UserInput from '../common/UserInput';
import styled from 'styled-components';

const Main = () => {

  return (
    <MainContainer>
      <MainHeader>FC-Archive</MainHeader>
      <UserInput/>
    </MainContainer>
  )
}

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
`;
const MainHeader = styled.h1`
  text-align: center;
  font-size: 40px;
  font-weight: 800;
  line-height: 1.6;
  margin-bottom: 20px;
  color : var(--textDefault);
`;

export default Main