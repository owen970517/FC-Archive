import React, { useMemo } from 'react'
import * as S from '../../styles/Player.styled';
import { useDispatch, useSelector } from 'react-redux';
import { matchActions } from '../../store/matchSlice';
import { RootState } from '../../store/store';
import CloseBtn from '../../assets/close.svg';
import { Member } from '../../types/squad';
import { useQuery } from '@tanstack/react-query';
import { getMemberDetails } from '../../apis/getLeagues';
import LoadingSpinner from '../../common/LoadingSpinner';
import styled from 'styled-components';
import CoachDetail from './CoachDetail';
import { IMemberDetails } from '../../types/memberDetail';

const MemberDetail = ({member} : {member:Member}) => {
  const {isModal} = useSelector((state:RootState) => state.matches)
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(matchActions.setIsModal(!isModal))
  }
  const {data:memberDetails, isLoading} = useQuery<IMemberDetails>({
    queryKey : ['member',member?.id],
    queryFn : () => getMemberDetails(Number(member?.id)),
  }) 
  
  const totalTournaments = useMemo(() => {
    return memberDetails?.trophies.playerTrophies.reduce((acc, player) => acc + player.tournaments.length, 0) ?? 0;
  }, [memberDetails]); 
  
  return (
    <S.PlayerWrapper>
      <S.Close src={CloseBtn} alt='close' onClick={handleClose}/>
      {isLoading ? 
        <LoadingWrapper>
          <LoadingSpinner/>
        </LoadingWrapper> :
      <>
        {memberDetails?.isCoach === true ? <CoachDetail coach={memberDetails}/> :
          <>
            <S.Player>
              <S.PlayerImageWrapper>
                <S.PlayerImage src={`https://images.fotmob.com/image_resources/playerimages/${memberDetails?.id}.png`}/>
              </S.PlayerImageWrapper>
              <h3>{memberDetails?.name}</h3>
            </S.Player>
            <S.PlayerInfo>
              <S.InfoItem>
                <span>키/나이</span>
                <span>{memberDetails?.playerInformation[0]?.value.numberValue}/{memberDetails?.playerInformation[2].value.numberValue}</span>
              </S.InfoItem>
              <S.InfoItem>
                <span>등번호</span>
                <span>{memberDetails?.playerInformation[1].value.numberValue}</span>
              </S.InfoItem>
              <S.InfoItem>
                <span>시장 가치 </span>
                <span>{memberDetails?.playerInformation[5].value.fallback}</span>
              </S.InfoItem>
            </S.PlayerInfo>
            <S.PlayerStatus>
              <h3>선수 스탯</h3>
              <S.StatusItem>
                <S.StatusName>총 우승 횟수</S.StatusName>
                <S.StatusValue>{totalTournaments}</S.StatusValue>
              </S.StatusItem>
              <S.StatusItem>
                <S.StatusName>평점</S.StatusName>
                <S.StatusValue>{memberDetails?.mainLeague.stats[5].value}</S.StatusValue>
              </S.StatusItem>
              <S.StatusItem>
                <S.StatusName>득점</S.StatusName>
                <S.StatusValue>{memberDetails?.mainLeague.stats[0].value}</S.StatusValue>
              </S.StatusItem>
              <S.StatusItem>
                <S.StatusName>도움</S.StatusName>
                <S.StatusValue>{memberDetails?.mainLeague.stats[1].value}</S.StatusValue>
              </S.StatusItem>
              <S.StatusItem>
                <S.StatusName>경기</S.StatusName>
                <S.StatusValue>{memberDetails?.mainLeague.stats[3].value}</S.StatusValue>
              </S.StatusItem>
              <S.StatusItem>
                <S.StatusName>선발</S.StatusName>
                <S.StatusValue>{memberDetails?.mainLeague.stats[2].value}</S.StatusValue>
              </S.StatusItem>
              <S.StatusItem>
                <S.StatusName>출전 시간</S.StatusName>
                <S.StatusValue>{memberDetails?.mainLeague.stats[4].value}분</S.StatusValue>
              </S.StatusItem>
              <S.StatusItem>
                <S.StatusName>주발</S.StatusName>
                <S.StatusValue>{memberDetails?.playerInformation[3].value.key}</S.StatusValue>
              </S.StatusItem>
              <S.StatusItem>
                <S.StatusName>옐로 카드</S.StatusName>
                <S.StatusValue>{memberDetails?.mainLeague.stats[6].value}</S.StatusValue>
              </S.StatusItem>
              <S.StatusItem>
                <S.StatusName>레드 카드</S.StatusName>
                <S.StatusValue>{memberDetails?.mainLeague.stats[7].value}</S.StatusValue>
              </S.StatusItem>
            </S.PlayerStatus>
          </>
        }
      </>    
      }
    </S.PlayerWrapper>
  )
}

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default MemberDetail