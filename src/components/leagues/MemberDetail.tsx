import React from 'react'
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
import GoalKeeper from './GoalKeeper';
import Memeber from './Memeber';

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
  return (
    <S.PlayerWrapper>
      <S.Close src={CloseBtn} alt='close' onClick={handleClose}/>
      {isLoading ? 
        <LoadingWrapper>
          <LoadingSpinner/>
        </LoadingWrapper> :
      <>  
        {memberDetails?.positionDescription.primaryPosition.label === 'Keeper' ? <GoalKeeper keeper={memberDetails}/> :
          memberDetails?.isCoach === true ? <CoachDetail coach={memberDetails}/> : 
          <Memeber member={memberDetails!} />
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