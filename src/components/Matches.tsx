import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import styled from 'styled-components'
import { IMatchInfo } from '../types/matchInfo'
import dayjs from 'dayjs'
import Up from '../assets/up.svg'
import Down from '../assets/down.svg'
import MatchDetail from './MatchDetail'
import { matchActions } from '../store/matchSlice'
import { userActions } from '../store/userSlice'
import LoadingSpinner from '../common/LoadingSpinner'
import { useNavigate } from 'react-router-dom'

const Matches = () => {
  const dispatch = useDispatch();
  const {allMatchInfo,openList,offset,isLoadingMore} = useSelector((state:RootState) => state.matches)
  const nav = useNavigate();
  const {ouid} = useSelector((state:RootState) => state.user)
  const handleLoadMore = () => {
    dispatch(matchActions.setOffset(offset+10))
    dispatch(matchActions.setIsLoadingMore(true))
  }

  const handleOpen = (id:string) => {
    dispatch(matchActions.setHandleOpen(id))
  }

  const clickNickname = (id:string) => {
    dispatch(matchActions.initState())
    dispatch(userActions.setOuid(id))
  }

  return (
    <>
      {
        allMatchInfo.map((match: IMatchInfo, idx) => {
          let isLast = idx === allMatchInfo.length - 1;
          if (!match.matchInfo) {
            return null; 
          }
          return (
            <React.Fragment key={idx}>
              <MatchLists>
                <MatchItem result={ouid === match.matchInfo[0].ouid ? match.matchInfo[0].matchDetail.matchResult : match.matchInfo[1].matchDetail.matchResult}>
                  <MatchInfo>
                    <h3>{ouid === match.matchInfo[0].ouid ? match.matchInfo[0].matchDetail.matchResult : match.matchInfo[1].matchDetail.matchResult}</h3>
                    <p>{dayjs(match.matchDate).fromNow()}</p>
                  </MatchInfo>
                  <h3>
                    <UserNickName 
                      onClick={() => {clickNickname(match.matchInfo[0].ouid); nav(`/search?nickname=${match.matchInfo[0].nickname}`);}}>
                        {match.matchInfo[0].nickname}</UserNickName> {match.matchInfo[0].shoot.goalTotal !== null ? match.matchInfo[0].shoot.goalTotal : '몰수패'} : {match.matchInfo[1].shoot.goalTotal !== null ? match.matchInfo[1].shoot.goalTotal : '몰수패'}
                    <UserNickName 
                      onClick={() => {clickNickname(match.matchInfo[1].ouid); nav(`/search?nickname=${match.matchInfo[1].nickname}`);}}> {match.matchInfo[1].nickname}
                    </UserNickName>
                  </h3> 
                  {
                    openList.includes(match.matchId) ? <Arrow src={Up} onClick={() => handleOpen(match.matchId)} alt='up'/> : <Arrow src={Down} onClick={() => handleOpen(match.matchId)} alt='down'/>
                  }
                </MatchItem>
              </MatchLists>
              {openList.map((now, idx) => now === match.matchId && <MatchDetail key={idx} match={match}/>)}
              {isLast && (
                isLoadingMore ? <LoadingSpinner/> :
                <ButtonWrapper>
                  <MoreButton onClick={handleLoadMore}>더 보기</MoreButton>
                </ButtonWrapper>
                )
              }
            </React.Fragment>
          )
        })}
    </>
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
`;

const Arrow = styled.img`
  width:20px;
  height: 20px;
  cursor: pointer;
`
const UserNickName = styled.span`
  font-size: 16px;
  cursor: pointer;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const MoreButton = styled.button`
  width: 80%;
  border-radius: 5px;
  font-size: 16px;
  padding : 10px;
  border: none;
  cursor: pointer;

`

export default Matches