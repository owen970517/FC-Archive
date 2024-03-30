import React, { useCallback } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styled from 'styled-components';

const Avarage = () => {
  const { allMatchInfo } = useSelector((state: RootState) => state.matches);
  const { ouid } = useSelector((state: RootState) => state.user);

  const calculateAverage = useCallback(() => {
    const initialData = { totalPossession: 0, totalConceded: 0, totalGoal: 0, matchCount: allMatchInfo.length };
    const nowData = allMatchInfo.reduce((acc, curr) => {
      if (curr.matchInfo && curr.matchInfo.length > 1) {
        const isUserTeam = ouid === curr.matchInfo[0].ouid;
        const userTeam = isUserTeam ? 0 : 1;
        const opponentTeam = isUserTeam ? 1 : 0;
        
        acc.totalPossession += curr.matchInfo[userTeam].matchDetail.possession;
        acc.totalConceded += curr.matchInfo[opponentTeam].shoot.goalTotal;
        acc.totalGoal += curr.matchInfo[userTeam].shoot.goalTotal;
      }
      return acc;
    }, initialData);

    return {
      averagePossession: nowData.matchCount ? nowData.totalPossession / nowData.matchCount : 0,
      averageConceded: nowData.matchCount ? nowData.totalConceded / nowData.matchCount : 0,
      averageGoal: nowData.matchCount ? nowData.totalGoal / nowData.matchCount : 0,
    };
  }, [allMatchInfo, ouid]);

  const averageData = calculateAverage();

  return (
    <AvaragesContainer>
      <AvarageCard>
        <AvarageTitle>{allMatchInfo.length}경기 평균 점유율</AvarageTitle>
        <AvarageValue color="#2a9d8f">{averageData.averagePossession.toFixed(1)}%</AvarageValue>
      </AvarageCard>
      <AvarageCard>
        <AvarageTitle>{allMatchInfo.length}경기 평균 득점수</AvarageTitle>
        <AvarageValue color="#e76f51">{averageData.averageGoal.toFixed(1)}</AvarageValue>
      </AvarageCard>
      <AvarageCard>
        <AvarageTitle>{allMatchInfo.length}경기 평균 실점</AvarageTitle>
        <AvarageValue color="#264653">{averageData.averageConceded.toFixed(1)}</AvarageValue>
      </AvarageCard>
    </AvaragesContainer>
  );
};
const AvaragesContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f4f4f4;
  border-radius: 10px;
  margin : 10px auto;
  padding: 10px 0;
`;
const AvarageCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 5px;
  border-radius: 10px;
`;

// 제목(h3) 스타일
const AvarageTitle = styled.h3`
  color: #333;
  margin-bottom: 10px;
`;

// 통계 값(p) 스타일
const AvarageValue = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: ${({color}) => color || '#333'}; // 색상을 prop으로 받아서 적용
`;

export default Avarage