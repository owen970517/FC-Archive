import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Avarage from '../infos/Avarage';
import Header from '../../common/Header';
import UserInfo from '../infos/UserInfo';
import MatchType from '../../common/MatchType';
import MatchListContainer from './MatchListContainer';
import { matchActions } from '../../store/matchSlice';
import LoadingSpinner from '../../common/LoadingSpinner';
import styled from 'styled-components';
import { useInfiniteQuery, useQueries } from '@tanstack/react-query';
import { fetchMatchDetails, fetchMatchId } from '../../apis/getMatch';
import { IMatchInfo } from '../../types/matchInfo';
import { fetchUserId } from '../../apis/getOuid';
import { userActions } from '../../store/userSlice';
import { useSearchParams } from 'react-router-dom';

dayjs.extend(relativeTime);
dayjs.locale("ko");

const Match = () => {
  const dispatch = useDispatch();
  const { allMatchInfo, type, isInitLoading } = useSelector((state: RootState) => state.matches);
  const { ouid } = useSelector((state: RootState) => state.user);
  const [name] = useSearchParams();
  const [allQueriesCompleted, setAllQueriesCompleted] = useState(false);

  useEffect(() => {
    const updateOuid = async () => {
      const newOuid = await fetchUserId(name.get('nickname')!);
      if (ouid !== newOuid) {
        dispatch(matchActions.initState());
        dispatch(userActions.setOuid(newOuid));
        dispatch(matchActions.setIsInitLoading(false));
      }
    }
    updateOuid();
  }, [name]);

  const {
    data: matchIdsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isMatchIdsLoading,
  } = useInfiniteQuery({
    queryKey: ['matchId', { ouid, type }],
    queryFn: ({ pageParam = 0 }) => fetchMatchId({ ouid, type, offset: pageParam }),
    initialPageParam : 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    enabled: !!ouid,
  });

  const matchIds = matchIdsData?.pages[matchIdsData?.pages.length - 1].data;

  const matchDetails = useQueries<IMatchInfo[]>({
    queries: matchIds?.map(id => ({
      queryKey: ['matchDetails', id],
      queryFn: () => fetchMatchDetails(id),
    })) || []
  })

  useEffect(() => {
    if (matchDetails.length >= 0) {
      const allSuccess = matchDetails.every(query => query.isSuccess);
      setAllQueriesCompleted(allSuccess);
    }
  }, [matchDetails, ouid]);
  
  useEffect(() => {
    if (allQueriesCompleted) {
      const allMatchDetailsData = matchDetails.map(query => query.data);
      dispatch(matchActions.setAllMatchInfo(allMatchDetailsData));
    }
  }, [allQueriesCompleted]);

  useEffect(() => {
    if (allQueriesCompleted) {
      setAllQueriesCompleted(false)
    }
  },[allQueriesCompleted, type, ouid])
  
  return (
    <>
      <Header/>
      {
        (!isInitLoading && ouid === '') ? 
          <ErrContainer>
            <h1>{name.get('nickname')}은 존재하지 않는 구단주입니다.</h1>
            <h3>다시 한번 확인 후 재시도 해주세요</h3>
          </ErrContainer> : 
          <>
            <UserInfo/>
            <MatchType/>
            {isMatchIdsLoading ? (
              <LoadingSpinner/> 
            ) : (allMatchInfo.length > 0 ) ? (
              <>
                <Avarage/>
                <MatchListContainer fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} />
              </>
            ) : 
              ((!isInitLoading && allQueriesCompleted && matchDetails.length === 0) && 
                <Wrapper>
                  <h1>최근 1달 전적이 없습니다.</h1>
                </Wrapper>
              )
            }
          </>
      }
    </>
  );
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const ErrContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default Match