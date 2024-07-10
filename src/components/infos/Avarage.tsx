import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styled from 'styled-components';
import { IMatchInfo } from '../../types/matchInfo';

const Avarage = () => {
  const { allMatchInfo } = useSelector((state: RootState) => state.matches);
  const { ouid } = useSelector((state: RootState) => state.user);

  const calculateAverage = ({allMatchInfo, ouid}:{allMatchInfo:IMatchInfo[],ouid:string}) => {
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
  };

  const averageData = useMemo(() => calculateAverage({allMatchInfo, ouid}), [allMatchInfo, ouid]);

  return (
    <AvaragesContainer>
      <AvarageCard>
        <AvarageTitle>{allMatchInfo.length}경기 평균 점유율</AvarageTitle>
        <AvarageValue>{averageData.averagePossession.toFixed(1)}%</AvarageValue>
      </AvarageCard>
      <AvarageCard>
        <AvarageTitle>{allMatchInfo.length}경기 평균 득점</AvarageTitle>
        <AvarageValue>{averageData.averageGoal.toFixed(1)}골</AvarageValue>
      </AvarageCard>
      <AvarageCard>
        <AvarageTitle>{allMatchInfo.length}경기 평균 실점</AvarageTitle>
        <AvarageValue>{averageData.averageConceded.toFixed(1)}골</AvarageValue>
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
  margin: 10px auto;
  padding: 10px 0;

  @media (max-width: 768px) {
    padding: 10px;
    margin: 10px auto;
  }
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
  margin: 10px 0;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const AvarageTitle = styled.p`
  font-size: 24px;
  font-weight: 800;
  color: #333;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const AvarageValue = styled.p`
  font-size: 20px;
  font-weight: 800;
  color: var(--nameColor);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Avarage