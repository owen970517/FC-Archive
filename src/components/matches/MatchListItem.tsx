import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/store';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { matchActions } from '../../store/matchSlice';
import { userActions } from '../../store/userSlice';
import Up from '../../assets/up.svg'
import Down from '../../assets/down.svg'
import { IMatchInfo } from '../../types/matchInfo';

const MatchListItem = ({match}:{match:IMatchInfo}) => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const {openList} = useSelector((state:RootState) => state.matches)
    const {ouid} = useSelector((state:RootState) => state.user)
    const handleToggleDetail = (id:string) => {
        dispatch(matchActions.setHandleOpen(id))
      }
    
      const clickNickname = (id:string) => {
        dispatch(matchActions.initState())
        dispatch(userActions.setOuid(id))
      }
  return (
    <MatchLists>
    <MatchItem result={ouid === match.matchInfo[0].ouid ? match.matchInfo[0].matchDetail.matchResult : match.matchInfo[1].matchDetail.matchResult}>
      <MatchInfo>
        <h3>{ouid === match.matchInfo[0].ouid ? match.matchInfo[0].matchDetail.matchResult : match.matchInfo[1].matchDetail.matchResult}</h3>
        <p>{dayjs(match.matchDate).fromNow()}</p>
      </MatchInfo>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}>
        <UserNickName 
          onClick={() => {clickNickname(match.matchInfo[0].ouid); nav(`/search?nickname=${match.matchInfo[0].nickname}`);}}>
            {match.matchInfo[0]?.nickname}</UserNickName> <Score>{match?.matchInfo[0]?.shoot?.goalTotal !== null ? match?.matchInfo[0]?.shoot?.goalTotal : '몰수패'}</Score> <p>:</p> <Score>{match.matchInfo[1]?.shoot?.goalTotal !== null ? match.matchInfo[1]?.shoot?.goalTotal : '몰수패'}</Score>
        <UserNickName 
          onClick={() => {clickNickname(match.matchInfo[1].ouid); nav(`/search?nickname=${match.matchInfo[1]?.nickname}`);}}> {match.matchInfo[1]?.nickname}
        </UserNickName>
      </div>
      {
        openList.includes(match.matchId) ? <Arrow src={Up} onClick={() => handleToggleDetail(match.matchId)} alt='up'/> : <Arrow src={Down} onClick={() => handleToggleDetail(match.matchId)} alt='down'/>
      }
    </MatchItem>
  </MatchLists>
  )
}
const MatchLists = styled.div`
  width: 80%;
  margin: 20px auto;
  border-radius: 10px;
`;

const MatchItem = styled.div<{result: string}>`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.5);
  background-color: ${
    props => props.result === '승' ? 'var(--winColor)' : props.result === '무' ? 'var(--drawColor)' : 'var(--loseColor)'
  };
  color: #333;
  > * {
    flex: 1;
    text-align: center; 
  }

`;

const MatchInfo = styled.div`
  display: flex;
  flex-direction: column;
  
  h3 {
    margin-bottom: 5px;
  }
  
  p {
    margin-top: 0;  
  }

  @media (max-width : 768px) {
    h3 {
    margin-bottom: 5px;
    font-size: 12px;
    }
  
    p {
      margin-top: 0;  
      font-size: 10px;
      font-weight: 300;
    }
  }
`;

const Arrow = styled.img`
  width:30px;
  height: 30px;
  cursor: pointer;
  @media (max-width : 768px) {
    width: 10px;
    height: 10px;
  }
`
const UserNickName = styled.span`
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color : #fff;
  }
  @media (max-width: 768px) {
    font-size: 9px;
    display: inline-block;
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
`

const Score = styled.span`
  font-size: 20px;
  margin: 0 10px;
  vertical-align: middle; 
  @media (max-width: 768px) {
    font-size: 11px;
  }
`

export default MatchListItem