import React, { useState } from 'react'
import { getLeagues } from '../../apis/getLeagues'
import Header from '../../common/Header'
import { ITeams } from '../../types/teams';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SelectLeague from './SelectLeague';
import LoadingSpinner from '../../common/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import { enTokrTeam } from '../../constants/translateTeam';

const TeamList = () => {
  const [nowid,setNowId] = useState(47);
  const {data:teamList, isLoading} = useQuery<ITeams[]>({
    queryKey : ['leagues',nowid],
    queryFn : () => getLeagues(nowid),
  }) 
  const translateName = (shortName:string) => {
    const nowLeague = enTokrTeam[nowid]
    if (nowLeague) {
      return nowLeague.teams[shortName] || shortName
    }
  }
  return (
    <>
        <Header/>
        <>
            <SelectLeague setNowId={setNowId}/>
            {isLoading ? <LoadingSpinner/> :               
            <RankTable>
                <RankHeader>
                <RankCell>순위</RankCell>
                <LogoCell>로고</LogoCell>
                <TeamtopNameCell>팀 이름</TeamtopNameCell>
                <RankCell>경기</RankCell>
                <RankCell>승</RankCell>
                <RankCell>패</RankCell>
                <RankCell>무</RankCell>
                <RankCell>득실차</RankCell>
                <RankCell>승점</RankCell>
                </RankHeader>
                {teamList?.map((team) => (
                <RankRow key={team.id}>
                <RankCell>{team.idx}</RankCell>
                <LogoCell>
                    <img src={`https://images.fotmob.com/image_resources/logo/teamlogo/${team.id}_small.png`} alt="logo" width="30" height="30"/>
                </LogoCell>
                <TeamNameCell to={`/league/${team.id}`}>{translateName(team.shortName)}</TeamNameCell>
                <RankCell>{team.played}</RankCell>
                <RankCell>{team.wins}</RankCell>
                <RankCell>{team.losses}</RankCell>
                <RankCell>{team.draws}</RankCell>
                <RankCell>{team.goalConDiff}</RankCell>
                <RankCell>{team.pts}</RankCell>
                </RankRow>
                ))}
            </RankTable>
    }
        </>
    </>
  )
}

const RankTable = styled.div`
  display: table;
  width: 70%;
  margin : 0 auto;
`;

const RankRow = styled.div`
  display: flex;
  align-items: center; 
  border-bottom: 1px solid #ddd;
`;

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

const TeamNameCell = styled(Link)` 
  flex: 2; 
  padding: 10px;
  text-align: left; 
  text-decoration: none;
  color : #000;
`;

const RankHeader = styled(RankRow)`
  background-color: #f2f2f2;
  font-weight: bold;
`;

export default TeamList