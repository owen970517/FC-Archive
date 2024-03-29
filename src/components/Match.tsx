import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Avarage from './Avarage';
import Header from '../common/Header';
import UserInfo from './UserInfo';
import MatchType from './MatchType';
import Matches from './Matches';
import { matchActions } from '../store/matchSlice';
import LoadingSpinner from '../common/LoadingSpinner';
import styled from 'styled-components';
import { useQueries, useQuery } from '@tanstack/react-query';
import { fetchMatchDetails, fetchMatchId } from '../apis/getMatch';
import { IMatchInfo } from '../types/matchInfo';

dayjs.extend(relativeTime);
dayjs.locale("ko");

const Match = () => {
  const dispatch = useDispatch();
  const { allMatchInfo, type, offset,isLoadingMore,isLoadingInit } = useSelector((state: RootState) => state.matches);
  const { ouid } = useSelector((state: RootState) => state.user);
  const [allQueriesCompleted, setAllQueriesCompleted] = useState(false);
  const {data:matchIds, isLoading} = useQuery<string[]>({
    queryKey : ['matchId',{ouid,type,offset}],
    queryFn : () => fetchMatchId({ouid,type,offset}),
    enabled : !!ouid
  })

  const matchDetails = useQueries<IMatchInfo[]>({
    queries: matchIds?.map(id => ({
      queryKey: ['matchDetails', id],
      queryFn: () => fetchMatchDetails(id),
    })) || []
  });

  useEffect(() => {
    if (matchDetails.length > 0) {
      const allSuccess = matchDetails.every(query => query.isSuccess);
      setAllQueriesCompleted(allSuccess);
    }
  }, [matchDetails]);

  useEffect(() => {
    if (allQueriesCompleted) {
      const allMatchDetailsData = matchDetails.map(query => query.data);
      dispatch(matchActions.setAllMatchInfo(allMatchDetailsData));
      if (isLoadingInit) {
        dispatch(matchActions.setIsLoadingInit(false))
      } else if (!isLoadingInit && isLoadingMore) {
        dispatch(matchActions.setIsLoadingMore(false))
      }
    }
  }, [allQueriesCompleted,type,ouid]);

  return (
    <>
      <Header/>
      {isLoadingInit ? <LoadingSpinner/> : 
        ouid === undefined ? 
          <h1>존재하지 않는 구단주입니다.</h1> : 
          <>
            <UserInfo/>
            <MatchType/>
            {(!isLoadingInit && !isLoadingMore && isLoading) ? (
              <LoadingSpinner/> 
            ) : allMatchInfo?.length > 0 ? (
              <>
                <Avarage/>
                <Matches/>
              </>
            ) : 
              <Wrapper>
                <h1>기록된 전적이 없습니다.</h1>
              </Wrapper>
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

export default Match