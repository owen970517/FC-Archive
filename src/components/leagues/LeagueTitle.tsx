import React from 'react'
import styled from 'styled-components';

const LeagueTitle = ({list}:{list:string[]}) => {
  const getStyledComponent = (name: string) => {
    switch (name) {
      case '순위':
      case '경기':
      case '승':
      case '패':
      case '무':
      case '득실차':
      case '승점':
        return RankCell;
      case '로고':
        return LogoCell;
      case '팀 이름':
        return TeamtopNameCell;
      default:
        return RankCell;
    }
  };
    
  return (
    <>
      {list.map((item, index) => {
        const StyledComponent = getStyledComponent(item);
        return <StyledComponent key={index}>{item}</StyledComponent>;
      })}
    </>
  )
}

const RankCell = styled.div` 
  flex: 1; 
  padding: 10px;
  text-align: center;
`;

const LogoCell = styled.div` 
  display: flex;
  justify-content: center; 
  padding: 10px;
  margin-right: 50px;
`;

const TeamtopNameCell = styled.div` 
  flex: 2; 
  padding: 10px;
  text-align: left; 
`;

export default LeagueTitle