import dayjs from 'dayjs';
import React, { useEffect } from 'react'
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
dayjs.extend(relativeTime);
dayjs.locale("ko");

const Match = () => {
    const dispatch = useDispatch();
    const { allMatchId, allMatchInfo, isLoading, type, offset, isLoadingMore } = useSelector((state: RootState) => state.matches);
    const { ouid } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const fetchMatchId = async () => {
            try {
                const urlString = `https://open.api.nexon.com/fconline/v1/user/match?ouid=${ouid}&matchtype=${type}&offset=${offset}&limit=10`;
                const response = await fetch(urlString, { headers: { "x-nxopen-api-key": process.env.REACT_APP_API_KEY! } });
                const data = await response.json();
                dispatch(matchActions.setAllMatchId(data));
            } catch(error) {
                console.error(error);
            } finally {
                if (allMatchId.length === 0) {
                    if (!isLoadingMore && isLoading) {
                        dispatch(matchActions.setIsLoading(false));
                    } else {
                        dispatch(matchActions.setIsLoadingMore(false));
                    }
                }
            }
        };
        fetchMatchId();
    }, [ouid, type, offset, isLoadingMore, isLoading, dispatch, allMatchId.length]);

    useEffect(() => {
        if (allMatchId.length > 0) {
            const fetchMatchDetails = async (id: string) => {
                try {
                    const urlString = `https://open.api.nexon.com/fconline/v1/match-detail?matchid=${id}`;
                    const response = await fetch(urlString, { headers: { "x-nxopen-api-key": process.env.REACT_APP_API_KEY! } });
                    return await response.json();
                } catch (error) {
                    console.error(error);
                }
            }
            const promises = allMatchId.map(id => fetchMatchDetails(id));
            Promise.all(promises).then(results => {
                dispatch(matchActions.setAllMatchInfo(results))
            }).finally(() => {
                if (!isLoadingMore && isLoading) {
                    dispatch(matchActions.setIsLoading(false));
                } else {
                    dispatch(matchActions.setIsLoadingMore(false));
                }
            });
        }
    }, [allMatchId, isLoadingMore, dispatch, isLoading]);
  return (
    <>
        <Header/>
        {isLoading ? <LoadingSpinner/> :
            ouid !== '' ? (
                allMatchInfo.length > 0 ? (
                    <>
                        <UserInfo/>
                        <MatchType/>
                        <Avarage/>
                        <Matches/>
                    </>
                ) : (
                    <>
                        <UserInfo/>
                        <h1>기록된 전적이 없습니다.</h1>
                    </>
                )
            ) : <Wrapper><h1>존재하지 않는 구단주 입니다.</h1></Wrapper>
        }
    </>
  )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export default Match