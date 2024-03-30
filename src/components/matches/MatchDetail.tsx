import React, { useState } from 'react'
import { category } from '../../constants/category';
import { IMatchInfo } from '../../types/matchInfo';
import AnalyzeGame from '../infos/AnalyzeGame';
import Formation from '../infos/Formation';
import styled from 'styled-components';

const MatchDetail = ({match} : {match:IMatchInfo}) => {
  const [isNow , setIsNow] = useState('경기 분석');
  const handleCategory= (e:React.MouseEvent<HTMLButtonElement>) => {
    setIsNow(e.currentTarget.value)
  }
  return (
    <Wrapper>
      <Categories>
        {category.map((c,idx) => <CategoryBtn $isActive={isNow === c} key={idx} value={c} onClick={(e) => handleCategory(e)}>{c}</CategoryBtn>)}
      </Categories>
      {isNow === '경기 분석' && <AnalyzeGame info={match}/>}
      {isNow === '홈 스쿼드' && <Formation player={match.matchInfo[0].player}/>}
      {isNow === '어웨이 스쿼드' && <Formation player={match.matchInfo[1].player}/>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  h1 {
    text-align: center;
  }
`

const Categories = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 10px;
`

const CategoryBtn = styled.button<{$isActive:boolean}>`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  background-color: ${props => props.$isActive ? '#000': ''};
  color: ${props => props.$isActive ? 'var(--textDefault)': '#000'};
  font-weight: 600;
  padding : 20px;
  border-radius: 10px;
`;

export default MatchDetail